import type { NextPage } from 'next'
import { useState } from 'react'

import { CareerSelection, RaceSelection, StepsLine } from 'components'
import { Race, Career } from 'models'

const CharacterCreation: NextPage = () => {
	const [currentStep, setCurrentStep] = useState<number>(1)

	const [totalXP, setTotalXP] = useState<number>(0)
	const [selectedRace, setSelectedRace] = useState<Race | undefined>()
	const [selectedCareer, setSelectedCareer] = useState<Career | undefined>()

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

	return (
		<div className='w-full flex flex-col'>
			<StepsLine
				steps={3}
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
					raceId={selectedRace!.id}
					onCareerSelected={selectCareer}
				/>
			)}
			{currentStep === 3 && (
				<div className='flex flex-col justify-center items-center'>
					<span className='text-xl font-bold mb-4'>Fin ! (Pour le moment)</span>
					<span className='text-xl font-bold my-4'>+{totalXP} PX</span>
					<span className='text-lg my-2'>{selectedRace!.name}</span>
					<span className='text-lg my-2'>{selectedCareer!.name}</span>
				</div>
			)}
		</div>
	)
}

export default CharacterCreation
