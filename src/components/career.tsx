import { NextPage } from 'next'

import CareerModel from '../models/career'

interface Props {
	career: CareerModel
}

const Career: NextPage<Props> = ({ career }) => {
	return (
		<div className='my-6 p-4 rounded-lg border bg-gray-800 border-gray-700 hover:bg-gray-700'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col'>
					<span className='inline text-2xl font-bold tracking-tight text-white'>
						{career.name}
					</span>
					<span className='inline font-normal text-gray-400'>
						{career.class}
					</span>
				</div>
				<span className='inline font-normal text-gray-400'>
					{career.races.join(', ')}
				</span>
			</div>
		</div>
	)
}

export default Career