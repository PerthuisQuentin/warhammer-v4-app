import { NextPage } from 'next'

import { CareerEvolution as CareerEvolutionModel } from 'models'
import { CareerRank } from 'components'

interface Props {
	careerEvolution: CareerEvolutionModel
}

const CareerEvolution: NextPage<Props> = ({ careerEvolution }) => {
	return (
		<div className='my-6 p-4 rounded-lg border bg-gray-700 border-gray-600'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-xl font-bold'>
					{careerEvolution.name}
				</span>
				<CareerRank careerRank={careerEvolution.rank} />
			</div>
			<div>
				<span className='text-l font-bold'>Caractéristiques : </span>
				<span>{careerEvolution.characteristics.join(', ')}</span>
			</div>
		</div>
	)
}

export default CareerEvolution