import { NextPage } from 'next'

import { Flap } from 'components'

interface Props {
	possession: string
}

const PossessionFlap: NextPage<Props> = ({
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