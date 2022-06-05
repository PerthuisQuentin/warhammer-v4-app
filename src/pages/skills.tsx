import type { NextPage } from 'next'
import { useState } from 'react'

import { SkillList, TextInput, SelectInput } from 'components'
import { SkillSearchCriteria } from 'types'

import WarHammer from 'warHammer'

const characteristicOptions = WarHammer.characteristics
	.map(characteristic => ({
		label: characteristic.name,
		value: characteristic.id
	}))

characteristicOptions.unshift({
	label: 'Toutes',
	value: ''
})

const Skills: NextPage = () => {
	const [textSearch, setTextSearch] = useState('')
	const [characteristicSelected, setCharacteristicSelected] = useState('')

	const searchCriteria: SkillSearchCriteria = {
		search: textSearch,
		characteristicId: characteristicSelected
	}

	return (
		<>
			<div className='w-full flex gap-4'>
				<TextInput
					id='textSearchInput'
					label='Recherche'
					placeholder='Art'
					value={textSearch}
					onChange={value => setTextSearch(value)}
				/>
				<SelectInput
					id='characteristicSelectInput'
					label='Caractéristique'
					value={characteristicSelected}
					options={characteristicOptions}
					onChange={value => setCharacteristicSelected(value)}
				/>
			</div>
			<SkillList searchCriteria={searchCriteria}/>
		</>
	)
}

export default Skills
