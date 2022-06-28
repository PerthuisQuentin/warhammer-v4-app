import { FunctionComponent } from 'react'

import { Flap } from 'components'
import { FlapColor } from 'types'

interface Props {
	possession: string
}

const PossessionFlap: FunctionComponent<Props> = ({
	possession,
}) => {
	return (
		<Flap 
			label={possession}
			color={FlapColor.Red}
		/>
	)
}

export default PossessionFlap