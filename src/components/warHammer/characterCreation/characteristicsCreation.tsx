import { NextPage } from 'next'

import { Dice } from 'components'
import { useMap } from 'hooks'

import WarHammer from 'warHammer'

const initialCharacteristicsRollsEntries: [string, number[]][] = WarHammer.characteristics.map(characteristic => [characteristic.id, []])

interface Props {
	onCharacteristicRolled?: (event: {
		characteristicId: string,
		roll: number,
	}) => void,
}

const CharacteristicsCreation: NextPage<Props> = ({
	onCharacteristicRolled,
}) => {
	const [characteristicsRolls, { set: setCharacteristicRoll }] = useMap<string, number[]>(initialCharacteristicsRollsEntries)

	const onRoll = (characteristicId: string, index: number) => (roll: number) => {
		const characteristicRolls = characteristicsRolls.get(characteristicId)!
		const newRolls = [...characteristicRolls]
		newRolls[index] = roll
		setCharacteristicRoll(characteristicId, newRolls)

		if (!newRolls[0] || !newRolls[1]) return
		const totalRolls = newRolls[0] + newRolls[1]
		onCharacteristicRolled && onCharacteristicRolled({
			characteristicId: characteristicId,
			roll: totalRolls!
		})
	}

	return (
		<div className='w-full flex justify-between py-2'>
			{WarHammer.characteristics.map(characteristic => {
				const characteristicRolls = characteristicsRolls.get(characteristic.id)!
				const total = characteristicRolls[0] && characteristicRolls[1]
					? characteristicRolls[0] + characteristicRolls[1]
					: '?'

				return (
					<div
						key={characteristic.id}
						className='w-10 flex flex-col items-center rounded-lg '
					>
						<span className='font-bold text-xl'>
							{characteristic.abbreviation}
						</span>
						<Dice
							className='mt-2'
							size='10'
							value={characteristicRolls[0]}
							max={10}
							oneRoll={true}
							onRolled={onRoll(characteristic.id, 0)}
						/>
						<Dice
							className='mt-2'
							size='10'
							value={characteristicRolls[1]}
							max={10}
							oneRoll={true}
							onRolled={onRoll(characteristic.id, 1)}
						/>
						<span className='mt-2 text-xl'>
							{total}
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default CharacteristicsCreation