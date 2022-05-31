import { NextPage } from 'next'

import { Talent as TalentModel } from 'models'
import { TalentMaxType } from 'types'
import { startWithVowel } from 'utils'

interface Props {
	talent: TalentModel
}

const talentToMaxText: Record<TalentMaxType, (talent: TalentModel) => string> = {
	[TalentMaxType.Raw]: talent => `${talent!.maxRaw}`,
	[TalentMaxType.Characteristic]: talent => {
		const characteristic = talent.maxCharacteristic!.name
		return startWithVowel(characteristic)
			? `Bonus d'${characteristic}`
			: `Bonus de ${characteristic}`
	},
	[TalentMaxType.Text]: talent => talent.maxText!,
	[TalentMaxType.None]: () => 'Aucun',
}

const Talent: NextPage<Props> = ({ talent }) => {
	const maxText = talentToMaxText[talent.maxType](talent)

	return (
		<div className='flex flex-col my-6 p-4 rounded-lg border bg-gray-800 border-gray-700'>
			<span className='inline text-2xl font-bold'>
				{talent.name}
			</span>
			<div className='text-gray-400'>
				<span className='font-bold'>Max : </span>
				<span>{maxText}</span>
			</div>
		</div>
	)
}

export default Talent