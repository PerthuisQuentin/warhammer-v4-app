
import { FunctionComponent } from 'react'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import { Header, Navigation, Modal, Characteristic, Skill, Talent } from 'components'
import type { RootState } from 'store'
import { closeCharacteristic, closeSkill, closeTalent } from 'store/warHammerModals'

import WarHammer from 'warHammer'

interface Props {
	children: React.ReactNode
}

const Main: FunctionComponent<Props> = ({
	children,
}) => {
	const dispatch = useDispatch()
	const warHammerModals = useSelector((state: RootState) => ({
		isCharacteristicOpen: state.warHammerModals.isCharacteristicOpen,
		isSkillOpen: state.warHammerModals.isSkillOpen,
		isTalentOpen: state.warHammerModals.isTalentOpen,
		characteristic: WarHammer.getCharacteristic(state.warHammerModals.characteristicId),
		skill: WarHammer.getSkill(state.warHammerModals.skillId),
		talent: WarHammer.getTalent(state.warHammerModals.talentId),
	}))

	return (
		<div className='flex min-h-screen flex-col items-center bg-gray-900 text-white'>
			<Head>
				<title>WarHammer App</title>
			</Head>
			<div className='w-full h-32 py-4 flex flex-col'>
				<Header/>
				<Navigation/>
			</div>
			<div className='w-full grow flex flex-col items-center sm:w-full md:w-8/12 lg:w-6/12 p-4'>
				{children}
			</div>
			<Modal
				title='Caractéristique'
				open={warHammerModals.isCharacteristicOpen}
				onClose={() => dispatch(closeCharacteristic())}
			>
				{warHammerModals.characteristic && (
					<Characteristic
						characteristic={warHammerModals.characteristic}
					/>
				)}
			</Modal>
			<Modal
				title='Compétence'
				open={warHammerModals.isSkillOpen}
				onClose={() => dispatch(closeSkill())}
			>
				{warHammerModals.skill && (
					<Skill
						skill={warHammerModals.skill}
					/>
				)}
			</Modal>
			<Modal
				title='Talent'
				open={warHammerModals.isTalentOpen}
				onClose={() => dispatch(closeTalent())}
			>
				{warHammerModals.talent && (
					<Talent
						talent={warHammerModals.talent}
					/>
				)}
			</Modal>
		</div>
	)
}

export default Main