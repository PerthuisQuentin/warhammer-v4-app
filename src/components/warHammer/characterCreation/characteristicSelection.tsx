import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { CharacteristicCreation } from 'components'

import { Race } from 'models'
import WarHammer from 'warHammer'

interface Props {
	race?: Race
}

const CharacteristicSelection: NextPage<Props> = ({
	race,
}) => {
	const [characteristicRolls, setCharacteristicRolls] = useState<Record<string, number>>({})
	const [finalCharacteristics, setFinalCharacteristics] = useState<Record<string, number>>({})

	useEffect(() => {
		const newFinalCharacteristics: Record<string, number> = {}

		WarHammer.characteristics.forEach(characteristic => {
			const characteristicRoll = characteristicRolls[characteristic.id]
			
			if (characteristicRoll) {
				const characteristicBonus = race!.getCharacteristicBonus(characteristic.id)!

				newFinalCharacteristics[characteristic.id] = characteristicBonus + characteristicRoll
			}
		})

		setFinalCharacteristics(newFinalCharacteristics)
	}, [race, characteristicRolls])

	const onCharacteristicRolled = (event: {
		characteristicId: string,
		roll: number,
	}) => {
		const { characteristicId, roll } = event

		setCharacteristicRolls({
			...characteristicRolls,
			[characteristicId]: roll,
		})
	}

	const characteristicsToRoll = WarHammer.characteristics.map(characteristic => (
		<CharacteristicCreation
			key={characteristic.id}
			characteristic={characteristic}
			onRolled={onCharacteristicRolled}
		/>
	))

	const characteristicsBonusItems = WarHammer.characteristics.map(characteristic => {
		const characteristicBonus = race!.getCharacteristicBonus(characteristic.id)!
		return (
			<div
				key={characteristic.id}
				className='w-10 flex flex-col items-center'
			>
				<span className='font-bold text-xl'>
					{characteristic.abbreviation}
				</span>
				<span className='text-xl'>
					{characteristicBonus}
				</span>
			</div>
		)
	})

	const finalCharacteristicsItems = WarHammer.characteristics.map(characteristic => {
		const characteristicValue = finalCharacteristics[characteristic.id] ?? '?'
		return (
			<div
				key={characteristic.id}
				className='w-10 flex flex-col items-center'
			>
				<span className='font-bold text-xl'>
					{characteristic.abbreviation}
				</span>
				<span className='text-xl'>
					{characteristicValue}
				</span>
			</div>
		)
	})

	return (
		<div className='w-full flex flex-col'>
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold mb-2'>
					Choix des caractéristiques
				</span>
				<span className='font-bold mb-2'>
					+50 PX
				</span>
			</div>
			<div className='w-full flex justify-between py-4'>
				{characteristicsToRoll}
			</div>
			<div className='flex justify-center items-center my-4'>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
				<span className='text-xl font-bold'>Bonus raciaux ({race!.name})</span>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
			</div>
			<div className='w-full flex justify-between py-4'>
				{characteristicsBonusItems}
			</div>
			<div className='flex justify-center items-center my-4'>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
				<span className='text-xl font-bold'>Caractéristiques finales</span>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
			</div>
			<div className='w-full flex justify-between py-4'>
				{finalCharacteristicsItems}
			</div>
		</div>
	)
}

export default CharacteristicSelection