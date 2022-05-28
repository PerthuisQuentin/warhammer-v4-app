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

	return (
		<div className='my-6 p-4 rounded-lg border bg-gray-700 border-gray-600'>
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
		</div>
	)
}

export default Evolution