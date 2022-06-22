import { FunctionComponent } from 'react'

import { Status as StatusModel } from 'models'

const RANK_TYPE_TO_COLOR: Record<string, string> = {
	'3': 'bg-yellow-900',
	'2': 'bg-slate-500',
	'1': 'bg-yellow-500',
}

interface Props {
	status: StatusModel
}

const Status: FunctionComponent<Props> = ({ status }) => {
	const backgroundColor = RANK_TYPE_TO_COLOR[status.tier.id]

	return (
		<div className={`${backgroundColor} rounded-lg py-1 px-2`}>
			{status.tier.name} {status.standing}
		</div>
	)
}

export default Status