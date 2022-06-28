import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Flap } from 'components'
import { EvolutionTalent } from 'models'
import { FlapColor } from 'types'
import { openTalent } from 'store/warHammerModals'

interface Props {
	evolutionTalent: EvolutionTalent
}

const TalentFlap: FunctionComponent<Props> = ({
	evolutionTalent,
}) => {
	const dispatch = useDispatch()
	const openTalentModal = () => dispatch(openTalent(evolutionTalent.talent.id))

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
			color={FlapColor.Green}
			onClick={openTalentModal}
		/>
	)
}

export default TalentFlap