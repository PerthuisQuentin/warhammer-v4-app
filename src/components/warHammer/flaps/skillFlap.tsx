import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Flap } from 'components'
import { EvolutionSkill } from 'models'
import { FlapColor } from 'types'
import { openSkill } from 'store/warHammerModals'

interface Props {
	evolutionSkill: EvolutionSkill
}

const SkillFlap: FunctionComponent<Props> = ({
	evolutionSkill,
}) => {
	const dispatch = useDispatch()
	const openSkillModal = () => dispatch(openSkill(evolutionSkill.skill.id))

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
			color={FlapColor.Blue}
			onClick={openSkillModal}
		/>
	)
}

export default SkillFlap