import { NextPage } from 'next'

import { CareerRank as CareerRankModel } from 'models'

const RANK_TYPE_TO_COLOR: Record<string, string> = {
	'Bronze': 'bg-yellow-900',
	'Argent': 'bg-slate-500',
	'Or': 'bg-yellow-500',
}

interface Props {
	careerRank: CareerRankModel
}

const CareerRank: NextPage<Props> = ({ careerRank }) => {
	const backgroundColor = RANK_TYPE_TO_COLOR[careerRank.type]

	return (
		<div className={`${backgroundColor} rounded-lg py-1 px-2`}>
			{careerRank.type} {careerRank.level}
		</div>
	)
}

export default CareerRank