import { NextPage } from 'next'
import { useState } from 'react'

import WarHammer from 'warHammer'

interface Props {
	characteristicsRolls: ReadonlyMap<string, number>
	onReorganize?: (characteristicIdA: string, characteristicIdB: string) => void
}

const CharacteristicReorganizable: NextPage<Props> = ({
	characteristicsRolls,
	onReorganize,
}) => {
	const [selectedCharacteristicId, setSelectedCharacteristicId] = useState<string>('')

	const onCharacteristicSelect = (characteristicId: string) => {
		if (!selectedCharacteristicId) {
			setSelectedCharacteristicId(characteristicId)
			return
		}
		if (characteristicId === selectedCharacteristicId) {
			setSelectedCharacteristicId('')
			return
		}

		onReorganize && onReorganize(selectedCharacteristicId, characteristicId)
		setSelectedCharacteristicId('')
	}

	return (
		<div className='w-full flex justify-between'>
			{WarHammer.characteristics.map(characteristic => {
				const characteristicsRoll = characteristicsRolls.get(characteristic.id) ?? '?'
				const selectedStyle = characteristic.id === selectedCharacteristicId
					? 'bg-gray-500'
					: ''

				return (
					<div
						key={characteristic.id}
						className={`w-10 py-1 flex flex-col items-center rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-500 ${selectedStyle}`}
						onClick={() => onCharacteristicSelect(characteristic.id)}
					>
						<span className='font-bold text-xl'>
							{characteristic.abbreviation}
						</span>
						<span className='text-xl'>
							{characteristicsRoll}
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default CharacteristicReorganizable