import { NextPage } from 'next'

import { Career as CareerModel } from 'models'
import { Evolution } from 'components'

interface Props {
	career: CareerModel
}

const Career: NextPage<Props> = ({ career }) => {
	const careerEvolutionItems = career.evolutions.map(evolution => (
		<Evolution
			key={evolution.name}
			evolution={evolution}
		/>
	))

	const races = career.races
		.map(race => race.name)
		.join(', ')

	return (
		<div className='my-6 p-4 rounded-lg border bg-gray-800 border-gray-700'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col'>
					<span className='inline text-2xl font-bold'>
						{career.name}
					</span>
					<span className='inline font-normal text-gray-400'>
						{career.category.name}
					</span>
				</div>
				<span className='inline font-normal text-gray-400'>
					{races}
				</span>
			</div>
			{careerEvolutionItems}
		</div>
	)
}

export default Career