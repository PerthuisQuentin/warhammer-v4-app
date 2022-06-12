import { NextPage } from 'next'

import { Flap } from 'components'
import { EvolutionSkill } from 'models'

interface Props {
	evolutionSkill: EvolutionSkill
}

const SkillFlap: NextPage<Props> = ({
	evolutionSkill,
}) => {
	let specializationLabel

	if (evolutionSkill.grouped) {
		if (!evolutionSkill.definedSpecialization) {
			specializationLabel = 'Au choix'
		} else {
			const specializations = evolutionSkill.specializations!
				.map(specialization => specialization.name)
				.join(' ou ')
			
			specializationLabel = specializations
		}
	}

	return (
		<Flap 
			label={evolutionSkill.skill.name}
			secondaryLabel={specializationLabel}
			color='bg-sky-700'
			secondaryColor='bg-sky-600'
		/>
	)
}

export default SkillFlap