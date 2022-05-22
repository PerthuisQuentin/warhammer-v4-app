import { NextPage } from 'next'
import { useState } from 'react'

import CareerSystem from '../models/careerSystem'
import CareerSystemSearchCriteria from '../types/careerSystemSearchCriteria'
import Career from './career'
import careersJson from '../../data/careers.json'
import TextInput from './textInput'
import SelectInput from './selectInput'

const careerSystem = new CareerSystem(careersJson)

const options = careerSystem.careerRaces
	.map(race => ({
		label: race,
		value: race
	}))

options.unshift({
	label: 'Toutes',
	value: ''
})

const CareersList: NextPage = () => {
	const [careerSearch, setCareerSearch] = useState('')
	const [classSearch, setClassSearch] = useState('')
	const [raceSelected, setRaceSelected] = useState('')

	const searchCriteria: CareerSystemSearchCriteria = {
		career: careerSearch,
		class: classSearch,
		race: raceSelected
	}

	const careerItems = careerSystem
		.getFilteredCareers(searchCriteria)
		.map(career => (
			<Career
				key={career.name}
				career={career}
			/>
		))

	return (
		<div className='w-8/12 p-4'>
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
					value={classSearch}
					onChange={value => setClassSearch(value)}
				/>
				<SelectInput
					id='raceSelectInput'
					label='Race'
					value={raceSelected}
					options={options}
					onChange={value => setRaceSelected(value)}
				/>
			</div>
			{careerItems}
		</div>
	)
}

export default CareersList