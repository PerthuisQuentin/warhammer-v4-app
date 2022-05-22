import { NextPage } from 'next'
import { useState } from 'react'

import CareerSystem from '../models/careerSystem'
import CareerSystemSearchCriteria from '../types/careerSystemSearchCriteria'
import Career from './career'
import careersJson from '../../data/careers.json'
import TextInput from './textInput'

const CareersList: NextPage = () => {
	const [careerSearch, setCareerSearch] = useState('')
	const [classSearch, setClassSearch] = useState('')

	const careerSystem = new CareerSystem(careersJson)

	const searchCriteria: CareerSystemSearchCriteria = {
		career: careerSearch,
		class: classSearch
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
					id='careerSearch'
					label='Carrière'
					placeholder='Agitateur'
					value={careerSearch}
					onChange={value => setCareerSearch(value)}
				/>
				<TextInput
					id='classSearch'
					label='Classe'
					placeholder='Citadins'
					value={classSearch}
					onChange={value => setClassSearch(value)}
				/>
			</div>
			{careerItems}
		</div>
	)
}

export default CareersList