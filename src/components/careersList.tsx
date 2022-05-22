import { NextPage } from 'next';
import { useState } from 'react';

import CareerSystem from '../models/careerSystem'
import CareerSystemSearchCriteria from '../types/careerSystemSearchCriteria';
import Career from './career'
import careersJson from '../../data/careers.json'
import TextInput from './textInput';

const CareersList: NextPage = () => {
	const [careerSearch, setCareerSearch] = useState('')

	const careerSystem = new CareerSystem(careersJson)

	const handleCareerSearchChange = (value: string) => {
		setCareerSearch(value)
	}

	const searchCriteria: CareerSystemSearchCriteria = {
		career: careerSearch
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
			<TextInput
				id="careerSearch"
				label='Carrière'
				placeholder='Agitateur'
				value={careerSearch}
				onChange={handleCareerSearchChange}
			/>
			{careerItems}
		</div>
	)
}

export default CareersList