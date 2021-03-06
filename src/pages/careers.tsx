import type { NextPage } from 'next'
import { useState } from 'react'

import { TextInput, SelectInput, CareerList } from 'components'
import { CareerSearchCriteria } from 'types'

import WarHammer from 'warHammer'

const raceOptions = WarHammer.races
	.map(race => ({
		label: race.name,
		value: race.id
	}))

raceOptions.unshift({
	label: 'Toutes',
	value: ''
})

const Careers: NextPage = () => {
	const [careerSearch, setCareerSearch] = useState<string>('')
	const [categorySearch, setCategorySearch] = useState<string>('')
	const [raceSelected, setRaceSelected] = useState<string>('')

	const searchCriteria: CareerSearchCriteria = {
		career: careerSearch,
		category: categorySearch,
		raceId: raceSelected
	}

	return (
		<>
			<div className='w-full flex gap-4'>
				<TextInput
					id='careerSearchInput'
					label='Carrière'
					placeholder='Agitateur'
					value={careerSearch}
					onChange={value => setCareerSearch(value)}
				/>
				<TextInput
					id='classSearchInput'
					label='Classe'
					placeholder='Citadins'
					value={categorySearch}
					onChange={value => setCategorySearch(value)}
				/>
				<SelectInput
					id='raceSelectInput'
					label='Race'
					value={raceSelected}
					options={raceOptions}
					onChange={value => setRaceSelected(value)}
				/>
			</div>
			<CareerList searchCriteria={searchCriteria} />
		</>
	)
}

export default Careers
