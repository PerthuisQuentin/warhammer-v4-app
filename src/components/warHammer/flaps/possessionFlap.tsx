import { FunctionComponent } from 'react'

import { Flap } from 'components'

interface Props {
	possession: string
}

const PossessionFlap: FunctionComponent<Props> = ({
	possession,
}) => {
	return (
		<Flap 
			label={possession}
			color='bg-red-700'
		/>
	)
}

export default PossessionFlap