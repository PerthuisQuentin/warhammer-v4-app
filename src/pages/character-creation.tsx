import type { NextPage } from 'next'
import { useState } from 'react'

import {
	CareerSelection,
	CharacteristicSelection,
	RaceSelection,
	StepsLine,
} from 'components'
import {
	Career,
	Race,
} from 'models'
import { useMap } from 'hooks'

import WarHammer from 'warHammer'

const CharacterCreation: NextPage = () => {
	const [currentStep, setCurrentStep] = useState<number>(1)

	const [totalXP, setTotalXP] = useState<number>(0)
	const [selectedRace, setSelectedRace] = useState<Race | undefined>()
	const [selectedCareer, setSelectedCareer] = useState<Career | undefined>()
	const [selectedCharacteristics, { setAll: setSelectedCharacteristics }] = useMap<string, number>()

	const selectRace = (event: { race: Race, xp: number }) => {
		setCurrentStep(2)
		setTotalXP(totalXP + event.xp)
		setSelectedRace(event.race)
	}

	const selectCareer = (event: { career: Career, xp: number }) => {
		setCurrentStep(3)
		setTotalXP(totalXP + event.xp)
		setSelectedCareer(event.career)
	}

	const selectCharacteristics = (event: {
		characteristics: ReadonlyMap<string, number>,
		xp: number,
	}) => {
		setCurrentStep(4)
		setTotalXP(totalXP + event.xp)
		setSelectedCharacteristics(event.characteristics)
	}

	return (
		<div className='w-full flex flex-col'>
			<StepsLine
				steps={4}
				currentStep={currentStep}
				className='mb-8'
			/>
			{currentStep === 1 && (
				<RaceSelection
					onRaceSelected={selectRace}
				/>
			)}
			{currentStep === 2 && (
				<CareerSelection
					race={selectedRace}
					onCareerSelected={selectCareer}
				/>
			)}
			{currentStep === 3 && (
				<CharacteristicSelection
					race={selectedRace}
					onCharacteristicsSelected={selectCharacteristics}
				/>
			)}
			{currentStep === 4 && (
				<div className='flex flex-col justify-center items-center'>
					<span className='text-xl font-bold mb-4'>Fin ! (Pour le moment)</span>
					<span className='text-xl font-bold my-4'>+{totalXP} PX</span>
					<span className='text-lg my-2'>{selectedRace!.name}</span>
					<span className='text-lg my-2'>{selectedCareer!.name}</span>
					<div className='w-full flex justify-between'>
						{WarHammer.characteristics.map(characteristic => {
							const characteristicValue = selectedCharacteristics.get(characteristic.id)!
							const characteristicBonus = selectedRace!.getCharacteristicBonus(characteristic.id)!
							return (
								<div
									key={characteristic.id}
									className='w-10 flex flex-col items-center'
								>
									<span className='font-bold text-xl'>
										{characteristic.abbreviation}
									</span>
									<span className='text-xl'>
										{characteristicValue + characteristicBonus}
									</span>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default CharacterCreation
