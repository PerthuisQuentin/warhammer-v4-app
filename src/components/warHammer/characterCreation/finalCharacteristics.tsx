import { NextPage } from 'next'

import { Race } from 'models'

import WarHammer from 'warHammer'

interface Props {
	race?: Race
	finalCharacteristics: ReadonlyMap<string, number>
}

const FinalCharacteristics: NextPage<Props> = ({
	race,
	finalCharacteristics,
}) => {
	return (
		<div className='flex flex-col items-center px-2 py-4'>
			<div className='w-full flex justify-between'>
				{WarHammer.characteristics.map(characteristic => (
					<span
						key={characteristic.id}
						className='w-10 font-bold text-xl flex justify-center'
					>
						{characteristic.abbreviation}
					</span>
				))}
			</div>
			<span className='py-1'>
				Bonus raciaux ({race!.name})
			</span>
			<div className='w-full flex justify-between'>
				{WarHammer.characteristics.map(characteristic => {
					const characteristicBonus = race!.getCharacteristicBonus(characteristic.id)!
					return (
						<div
							key={characteristic.id}
							className='w-10 text-xl flex justify-center'
						>
							{characteristicBonus}
						</div>
					)
				})}
			</div>
			<span className='py-1'>
				Caractéristiques finales
			</span>
			<div className='w-full flex justify-between'>
				{WarHammer.characteristics.map(characteristic => {
					const characteristicValue = finalCharacteristics.get(characteristic.id) ?? '?'
					return (
						<div
							key={characteristic.id}
							className='w-10 text-xl flex justify-center'
						>
							{characteristicValue}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default FinalCharacteristics