import type { NextPage } from 'next'
import { useState } from 'react'

import { TalentList, TextInput } from 'components'
import { TalentSearchCriteria } from 'types'

const Talents: NextPage = () => {
	const [textSearch, setTextSearch] = useState('')

	const searchCriteria: TalentSearchCriteria = {
		search: textSearch,
	}

	return (
		<div className='sm:w-full md:w-8/12 lg:w-6/12 p-4'>
						<div className='flex gap-4'>
				<TextInput
					id='textSearchInput'
					label='Recherche'
					placeholder='Affable'
					value={textSearch}
					onChange={value => setTextSearch(value)}
				/>
			</div>
			<TalentList searchCriteria={searchCriteria}/>
		</div>
	)
}

export default Talents
