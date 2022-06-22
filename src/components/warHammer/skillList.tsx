import { FunctionComponent } from 'react'

import { Skill } from 'components'
import { SkillSearchCriteria } from 'types'

import WarHammer from 'warHammer'

interface Props {
	searchCriteria: SkillSearchCriteria
}

const SkillList: FunctionComponent<Props> = ({ searchCriteria }) => {
	const skillItems = WarHammer
		.getFilteredSkills(searchCriteria)
		.map(skill => (
			<Skill
				key={skill.id}
				skill={skill}
			/>
		))

	return (
		<>
			{skillItems}
		</>
	)
}

export default SkillList