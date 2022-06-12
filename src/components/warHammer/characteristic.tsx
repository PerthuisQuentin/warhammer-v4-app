import { NextPage } from 'next'

import { Characteristic as CharacteristicModel } from 'models'

interface Props {
	characteristic: CharacteristicModel
}

const Characteristic: NextPage<Props> = ({ characteristic }) => {
	return (
		<div className='w-full flex flex-col my-4 p-4 rounded-lg border bg-gray-800 border-gray-700'>
			<span className='text-2xl font-bold'>
				{characteristic.name}
			</span>
		</div>
	)
}

export default Characteristic