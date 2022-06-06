import type { NextPage } from 'next'
import { useState } from 'react'

import { TalentList, TextInput } from 'components'
import { TalentSearchCriteria } from 'types'

const Talents: NextPage = () => {
	const [textSearch, setTextSearch] = useState<string>('')

	const searchCriteria: TalentSearchCriteria = {
		search: textSearch,
	}

	return (
		<>
			<div className='w-full flex gap-4'>
				<TextInput
					id='textSearchInput'
					label='Recherche'
					placeholder='Affable'
					value={textSearch}
					onChange={value => setTextSearch(value)}
				/>
			</div>
			<TalentList searchCriteria={searchCriteria}/>
		</>
	)
}

export default Talents
