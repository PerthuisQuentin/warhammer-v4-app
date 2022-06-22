import { FunctionComponent } from 'react'

import { Characteristic } from 'components'

import WarHammer from 'warHammer'

const CharacteristicList: FunctionComponent = () => {
	const characteristicItems = WarHammer
		.characteristics
		.map(characteristic => (
			<Characteristic
				key={characteristic.id}
				characteristic={characteristic}
			/>
		))

	return (
		<>
			{characteristicItems}
		</>
	)
}

export default CharacteristicList