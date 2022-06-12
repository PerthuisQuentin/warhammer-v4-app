import { NextPage } from 'next'

import { Characteristic } from 'components'

import WarHammer from 'warHammer'

const CharacteristicList: NextPage = () => {
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