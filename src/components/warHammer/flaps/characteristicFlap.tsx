import { FunctionComponent } from 'react'

import { Flap } from 'components'
import { Characteristic } from 'models'

interface Props {
	characteristic: Characteristic
}

const CharacteristicFlap: FunctionComponent<Props> = ({
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