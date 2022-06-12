import { NextPage } from 'next'

import { Flap } from 'components'
import { Characteristic } from 'models'

interface Props {
	characteristic: Characteristic
}

const CharacteristicFlap: NextPage<Props> = ({
	characteristic,
}) => {
	return (
		<Flap 
			label={characteristic.name}
			color='bg-yellow-600'
		/>
	)
}

export default CharacteristicFlap