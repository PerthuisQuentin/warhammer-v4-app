import { FunctionComponent } from 'react'

import { CareerSearchCriteria } from 'types'
import { Career } from 'components'

import WarHammer from 'warHammer'

interface Props {
	searchCriteria: CareerSearchCriteria
}

const CareerList: FunctionComponent<Props> = ({ searchCriteria }) => {
	const careerItems = WarHammer
		.getFilteredCareers(searchCriteria)
		.map(career => (
			<Career
				key={career.id}
				career={career}
			/>
		))

	return (
		<>
			{careerItems}
		</>
	)
}

export default CareerList