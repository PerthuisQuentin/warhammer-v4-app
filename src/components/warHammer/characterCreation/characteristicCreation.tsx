import { NextPage } from 'next'
import { useState } from 'react'

import { Dice } from 'components'
import { Characteristic } from 'models'

interface Props {
	characteristic: Characteristic
	onRolled?: (event: {
		characteristicId: string,
		roll: number,
	}) => void
}

const CharacteristicCreation: NextPage<Props> = ({
	characteristic,
	onRolled,
}) => {
	const [rolls, setRolls] = useState<Array<number | undefined>>([])

	const onRoll = (index: number) => (roll: number) => {
		const newRolls = [...rolls]
		newRolls[index] = roll
		setRolls(newRolls)

		if (!newRolls[0] || !newRolls[1]) return
		const totalRolls = newRolls[0] + newRolls[1]
		onRolled && onRolled({
			characteristicId: characteristic.id,
			roll: totalRolls!
		})
	}

	return (
		<div className='w-10 flex flex-col items-center'>
			<span className='font-bold text-xl'>
				{characteristic.abbreviation}
			</span>
			<Dice
				className='mt-2 w-10 h-10'
				value={rolls[0]}
				max={10}
				oneRoll={true}
				onRolled={onRoll(0)}
			/>
			<Dice
				className='mt-2 w-10 h-10'
				value={rolls[1]}
				max={10}
				oneRoll={true}
				onRolled={onRoll(1)}
			/>
		</div>
	)
}

export default CharacteristicCreation