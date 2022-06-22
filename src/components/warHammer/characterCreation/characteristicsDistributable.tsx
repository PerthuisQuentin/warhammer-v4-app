import { FunctionComponent } from 'react'
import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'

import { Button } from 'components'

import WarHammer from 'warHammer'

const POINTS_TO_DISTRIBUTE = 100
const MIN_POINTS = 4
const MAX_POINTS = 18

interface Props {
	characteristicsDistributed: ReadonlyMap<string, number>
	onChange?: (characteristicId: string, value: number, remainingPoints: number) => void
}

const CharacteristicsDistributable: FunctionComponent<Props> = ({
	characteristicsDistributed,
	onChange,
}) => {
	const spendPoints = WarHammer.characteristics.reduce((total, characteristic) => total + characteristicsDistributed.get(characteristic.id)!, 0)
	const remainingPoints = POINTS_TO_DISTRIBUTE - spendPoints

	const onAdd = (characteristicId: string, value: number) => {
		onChange && onChange(characteristicId, value + 1, remainingPoints - 1)
	}

	const onWithdraw = (characteristicId: string, value: number) => {
		onChange && onChange(characteristicId, value - 1, remainingPoints + 1)
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='flex justify-center mb-2 text-xl'>
				Points à répartir : {remainingPoints}
			</div>
			<div className='w-full flex justify-between'>
				{WarHammer.characteristics.map(characteristic => {
					const characteristicDistributed = characteristicsDistributed.get(characteristic.id)!
					const canAdd = (characteristicDistributed < MAX_POINTS) && (remainingPoints > 0)
					const canWithdraw = characteristicDistributed > MIN_POINTS
					return (
						<div
							key={characteristic.id}
							className={`w-10 flex flex-col items-center`}
						>
							<span className='font-bold text-xl'>
								{characteristic.abbreviation}
							</span>
							<span className='text-xl'>
								{characteristicDistributed}
							</span>
							<Button
								className='px-1 py-1 mt-2'
								disabled={!canAdd}
								onClick={() => onAdd(characteristic.id, characteristicDistributed)}
							>
								<PlusIcon className='w-5 h-5 text-white' />
							</Button>
							<Button
								className='px-1 py-1 mt-2'
								disabled={!canWithdraw}
								onClick={() => onWithdraw(characteristic.id, characteristicDistributed)}
							>
								<MinusIcon className='w-5 h-5 text-white' />
							</Button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default CharacteristicsDistributable