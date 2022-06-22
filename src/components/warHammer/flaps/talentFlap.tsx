import { FunctionComponent } from 'react'

import { Flap } from 'components'
import { EvolutionTalent } from 'models'

interface Props {
	evolutionTalent: EvolutionTalent
}

const TalentFlap: FunctionComponent<Props> = ({
	evolutionTalent,
}) => {
	let specializationLabel

	if (evolutionTalent.specialized) {
		if (!evolutionTalent.definedSpecialization) {
			specializationLabel = 'Au choix'
		} else {
			const specializations = evolutionTalent.specializations!
				.map(specialization => specialization.name)
				.join(' ou ')
			
			specializationLabel = specializations
		}
	}

	return (
		<Flap 
			label={evolutionTalent.talent.name}
			secondaryLabel={specializationLabel}
			color='bg-green-700'
			secondaryColor='bg-green-600'
		/>
	)
}

export default TalentFlap