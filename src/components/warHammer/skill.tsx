import { NextPage } from 'next'

import { Skill as SkillModel } from 'models'

interface Props {
	skill: SkillModel
}

const Skill: NextPage<Props> = ({ skill }) => {
	const attributes = [skill.base ? 'Base' : 'Avancée']
	if (skill.grouped) attributes.push('Groupée')

	const specializations = skill.specializations
		.map(specialization => specialization.name)
		.join(', ')

	return (
		<div className='w-full flex flex-col my-4 p-4 rounded-lg border bg-gray-800 border-gray-700'>
			<div className='flex justify-between mb-2'>
				<div className='flex flex-col'>
					<span className='text-2xl font-bold'>
						{skill.name}
					</span>
					<span className='text-gray-400'>
						{attributes.join(', ')}
					</span>
				</div>
				<span className='text-gray-400'>
					{skill.characteristic.name}
				</span>
			</div>
			<div className='my-2'>
				{skill.description}
			</div>
			{skill.grouped && (
				<div className='text-gray-200'>
					<span className='font-bold'>Spécialisations : </span>
					<span>{specializations}</span>
				</div>
			)}
		</div>
	)
}

export default Skill