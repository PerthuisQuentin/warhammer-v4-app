
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

	const isCharacteristicOpen = useSelector((state: RootState) => state.warHammerModals.isCharacteristicOpen)
	const characteristicId = useSelector((state: RootState) => state.warHammerModals.characteristicId)

	const isSkillOpen = useSelector((state: RootState) => state.warHammerModals.isSkillOpen)
	const skillId = useSelector((state: RootState) => state.warHammerModals.skillId)

	const isTalentOpen = useSelector((state: RootState) => state.warHammerModals.isTalentOpen)
	const talentId = useSelector((state: RootState) => state.warHammerModals.talentId)

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
				open={isCharacteristicOpen}
				onClose={() => dispatch(closeCharacteristic())}
			>
				{characteristicId && (
					<Characteristic
						characteristic={WarHammer.getCharacteristic(characteristicId)!}
					/>
				)}
			</Modal>
			<Modal
				title='Compétence'
				open={isSkillOpen}
				onClose={() => dispatch(closeSkill())}
			>
				{skillId && (
					<Skill
						skill={WarHammer.getSkill(skillId)!}
					/>
				)}
			</Modal>
			<Modal
				title='Talent'
				open={isTalentOpen}
				onClose={() => dispatch(closeTalent())}
			>
				{talentId && (
					<Talent
						talent={WarHammer.getTalent(talentId)!}
					/>
				)}
			</Modal>
		</div>
	)
}

export default Main