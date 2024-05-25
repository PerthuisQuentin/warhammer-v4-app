import { FunctionComponent } from 'react'

import { Career, Race } from 'models'
import { Toggle } from 'components'

import WarHammer from 'warHammer'

interface Props {
	career?: Career
	race?: Race
	onExtraPointsSelected?: (characteristics: string[]) => void
}

const ExtraPointsSelection: FunctionComponent<Props> = ({
	career,
	race,
	onExtraPointsSelected,
}) => {
	return (
		<div className='w-full flex flex-col'>
			<div className='flex items-center justify-start mb-2'>
				<span className='text-2xl font-bold mb-2'>
					Choix des points supplémentaires
				</span>
			</div>
			<div className='relative px-2'>
				t
			</div>
		</div>
	)
}

export default ExtraPointsSelection