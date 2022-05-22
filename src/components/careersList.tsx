import { NextPage } from 'next';
import { useState } from 'react';

import CareerSystem from '../models/careerSystem'
import CareerSystemSearchCriteria from '../types/careerSystemSearchCriteria';
import Career from './career'
import careersJson from '../../data/careers.json'

const CareersList: NextPage = () => {
	const [careerSearch, setCareerSearch] = useState('')

	const careerSystem = new CareerSystem(careersJson)

	const handleCareerSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCareerSearch(event.target.value)
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
			<div>
				<label
					htmlFor="careerSearch"
					className="block mb-2 text-sm font-medium text-gray-300"
				>
						Carrière
				</label>
				<input
					type="text"
					id="careerSearch"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
					placeholder="Agitateur"
					onChange={handleCareerSearchChange}
				/>
			</div>
			{careerItems}
		</div>
	)
}

export default CareersList