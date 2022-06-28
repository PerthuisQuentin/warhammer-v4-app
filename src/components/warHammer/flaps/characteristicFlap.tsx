import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Flap } from 'components'
import { Characteristic } from 'models'
import { FlapColor } from 'types'
import { openCharacteristic } from 'store/warHammerModals'

interface Props {
	characteristic: Characteristic
}

const CharacteristicFlap: FunctionComponent<Props> = ({
	characteristic,
}) => {
	const dispatch = useDispatch()
	const openCharacteristicModal = () => dispatch(openCharacteristic(characteristic.id))

	return (
		<Flap 
			label={characteristic.name}
			color={FlapColor.Yellow}
			onClick={openCharacteristicModal}
		/>
	)
}

export default CharacteristicFlap