import { NextPage } from 'next'

import { CareerEvolution as CareerEvolutionModel } from 'models'
import { CareerRank } from 'components'

interface Props {
	careerEvolution: CareerEvolutionModel
}

const CareerEvolution: NextPage<Props> = ({ careerEvolution }) => {
	return (
		<div className='my-6 p-4 rounded-lg border bg-gray-700 border-gray-600'>
			<div className='flex items-center justify-between'>
				<span className='inline text-l font-bold text-white'>
					{careerEvolution.name}
				</span>
				<CareerRank careerRank={careerEvolution.rank} />
			</div>
		</div>
	)
}

export default CareerEvolution