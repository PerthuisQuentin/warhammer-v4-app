import { NextPage } from 'next'

import { Talent } from 'components'
import { TalentSearchCriteria } from 'types'

import WarHammer from 'warHammer'

interface Props {
	searchCriteria: TalentSearchCriteria
}

const TalentList: NextPage<Props> = ({ searchCriteria }) => {
	const talentsItems = WarHammer
		.getFilteredTalents(searchCriteria)
		.map(talent => (
			<Talent
				key={talent.id}
				talent={talent}
			/>
		))

	return (
		<>
			{talentsItems}
		</>
	)
}

export default TalentList