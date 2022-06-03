import { NextPage } from 'next'

import { Evolution as EvolutionModel } from 'models'
import { Status } from 'components'

interface Props {
	evolution: EvolutionModel
}

const Evolution: NextPage<Props> = ({ evolution }) => {
	const characteristics = evolution.characteristics
		.map(characteristic => characteristic.name)
		.join(', ')

	const talents = evolution.talents
		.map(talent => {
			if (!talent.specialized) return talent.name
			
			if (!talent.definedSpecialization) return `${talent.name} (Au choix)`

			const specializations = talent.specializations!
				.map(specialization => specialization.name)
				.join(' ou ')

			return `${talent.name} (${specializations})`
		})
		.join(', ')

	const possessions = evolution.possessions
		.join(', ')

	return (
		<div className='flex flex-col p-4 my-2 rounded-lg border bg-gray-700 border-gray-600'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-xl font-bold'>
					{evolution.name}
				</span>
				<Status status={evolution.status} />
			</div>
			<div>
				<span className='text-l font-bold'>Caractéristiques : </span>
				<span>{characteristics}</span>
			</div>
			<div>
				<span className='text-l font-bold'>Talents : </span>
				<span>{talents}</span>
			</div>
			<div>
				<span className='text-l font-bold'>Possessions : </span>
				<span>{possessions}</span>
			</div>
		</div>
	)
}

export default Evolution