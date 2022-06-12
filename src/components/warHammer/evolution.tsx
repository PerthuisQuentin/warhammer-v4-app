import { NextPage } from 'next'

import { Evolution as EvolutionModel } from 'models'
import { Status, CharacteristicFlap, SkillFlap, TalentFlap, PossessionFlap } from 'components'

interface Props {
	evolution: EvolutionModel
}

const Evolution: NextPage<Props> = ({ evolution }) => {
	const characteristics = evolution.characteristics
		.map(characteristic => (
			<CharacteristicFlap
				key={characteristic.id}
				characteristic={characteristic}
			/>
		))

	const skills = evolution.skills
		.map((evolutionSkill, index) => (
			<SkillFlap
				key={`${evolutionSkill.skill.id}-${index}`}
				evolutionSkill={evolutionSkill}
			/>
		))

	const talents = evolution.talents
		.map((evolutionTalent, index) => (
			<TalentFlap
				key={`${evolutionTalent.talent.id}-${index}`}
				evolutionTalent={evolutionTalent}
			/>
		))

	const possessions = evolution.possessions
		.map(possession => (
			<PossessionFlap
				key={possession}
				possession={possession}
			/>
		))

	return (
		<div className='flex flex-col p-4 my-2 rounded-lg border bg-gray-700 border-gray-600'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-xl font-bold'>
					{evolution.name}
				</span>
				<Status status={evolution.status} />
			</div>
			<span className='text-l'>Caractéristiques</span>
			<hr className='w-full h-px border-none bg-gray-500 mb-2'/>
			<div className='flex flex-wrap gap-1'>
				{characteristics}
			</div>
			<span className='text-l mt-2'>Compétences</span>
			<hr className='w-full h-px border-none bg-gray-500 mb-2'/>
			<div className='flex flex-wrap gap-1'>
				{skills}
			</div>
			<span className='text-l mt-2'>Talents</span>
			<hr className='w-full h-px border-none bg-gray-500 mb-2'/>
			<div className='flex flex-wrap gap-1'>
				{talents}
			</div>
			<span className='text-l mt-2'>Possessions</span>
			<hr className='w-full h-px border-none bg-gray-500 mb-2'/>
			<div className='flex flex-wrap gap-1'>
				{possessions}
			</div>
		</div>
	)
}

export default Evolution