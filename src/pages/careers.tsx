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
	const [careerSearch, setCareerSearch] = useState('')
	const [categorySearch, setCategorySearch] = useState('')
	const [raceSelected, setRaceSelected] = useState('')

	const searchCriteria: CareerSearchCriteria = {
		career: careerSearch,
		category: categorySearch,
		raceId: raceSelected
	}

	return (
		<div className='sm:w-full md:w-8/12 lg:w-6/12 p-4'>
			<div className='flex gap-4'>
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
		</div>
	)
}

export default Careers
