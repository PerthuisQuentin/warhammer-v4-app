import { NextPage } from 'next'
import { useState } from 'react'

import {
	Button,
	CreationSelectionLine,
	LockOverlay,
	SelectInput,
	TextSeparator,
} from 'components'
import { Career, Race } from 'models'

import WarHammer from 'warHammer'

const XP_ON_ONE_ROLLED_CAREER = 50
const XP_ON_THREE_ROLLED_CAREER = 25
const XP_ON_CHOOSED_CAREER = 0
	
interface Props {
	race?: Race
	onCareerSelected?: (event: { career: Career, xp: number }) => void
}

const CareerSelection: NextPage<Props> = ({
	race,
	onCareerSelected,
}) => {
	const [rolls, setRolls] = useState<Array<number | undefined>>([])
	const [careers, setCareers] = useState<Array<Career | undefined>>([])

	const [moreOptions, setMoreOptions] = useState<boolean>(false)
	const [chooseCareer, setChooseCareer] = useState<boolean>(false)

	const [careerSelected, setCareerSelected] = useState<string>(WarHammer.careers[0].id)

	const setRolledCareers = (index: number) => (roll: number) => {
		const newRolls = [...rolls]
		const newCareers = [...careers]

		if (!race) throw new Error('No raceId')
		const rolledCareer = WarHammer.getCareerByRoll(race.id, roll)
		if (!rolledCareer) throw new Error(`No career on race ${race.id} and roll ${roll}`)

		newRolls[index] = roll
		newCareers[index] = rolledCareer

		setRolls(newRolls)
		setCareers(newCareers)
	}

	let xp = XP_ON_ONE_ROLLED_CAREER
	if (moreOptions) xp = XP_ON_THREE_ROLLED_CAREER
	if (chooseCareer) xp = XP_ON_CHOOSED_CAREER

	const selectRolledCareer = (index: number) => {
		onCareerSelected && onCareerSelected({
			career: careers[index]!,
			xp: moreOptions ? XP_ON_THREE_ROLLED_CAREER : XP_ON_ONE_ROLLED_CAREER,
		})
	}

	const selectChoosedCareer = () => {
		const choosedCareer = WarHammer.getCareer(careerSelected)
		if (!choosedCareer) throw new Error(`No career for id ${careerSelected}`)
		onCareerSelected && onCareerSelected({
			career: choosedCareer,
			xp: XP_ON_CHOOSED_CAREER
		})
	}

	const careerOptions = WarHammer.getFilteredCareers({ raceId: race!.id })
		.map(career => ({
			label: career.name,
			value: career.id
		}))

	return (
		<div className='w-full flex flex-col'>
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold mb-2'>
					Choix de la carrière
				</span>
				<span className='font-bold mb-2'>
					+{xp} PX
				</span>
			</div>
			<div className='relative p-4'>
				<CreationSelectionLine
					roll={rolls[0]}
					label={careers[0]?.name}
					buttonLabel='Choisir'
					onRoll={setRolledCareers(0)}
					onChoose={() => selectRolledCareer(0)}
				/>
				<LockOverlay
					locked={chooseCareer}
				/>
			</div>
			<TextSeparator className='my-4'>
				ou
			</TextSeparator>
			<div className='flex justify-center mb-4'>
				<Button
					disabled={moreOptions}
					onClick={() => setMoreOptions(true)}
				>
					Obtenir deux choix supplémentaires ({XP_ON_THREE_ROLLED_CAREER - XP_ON_ONE_ROLLED_CAREER} PX)
				</Button>
			</div>
			<div className='relative p-4'>
				<CreationSelectionLine
					className='mb-4'
					roll={rolls[1]}
					label={careers[1]?.name}
					buttonLabel='Choisir'
					onRoll={setRolledCareers(1)}
					onChoose={() => selectRolledCareer(1)}
				/>
				<CreationSelectionLine
					roll={rolls[2]}
					label={careers[2]?.name}
					buttonLabel='Choisir'
					onRoll={setRolledCareers(2)}
					onChoose={() => selectRolledCareer(2)}
				/>
				<LockOverlay
					locked={!moreOptions || chooseCareer}
				/>
			</div>
			<TextSeparator className='my-4'>
				ou
			</TextSeparator>
			<div className='flex justify-center mb-4'>
				<Button
					disabled={!moreOptions || chooseCareer}
					onClick={() => setChooseCareer(true)}
				>
					Choisir la carrière ({XP_ON_CHOOSED_CAREER - XP_ON_THREE_ROLLED_CAREER} PX)
				</Button>
			</div>
			<div className='relative flex justify-center p-4'>
				<div className='flex w-4/6 justify-center items-center'>
					<SelectInput
						id='careerSelectInput'
						value={careerSelected}
						options={careerOptions}
						onChange={setCareerSelected}
					/>
				</div>
				<div className='flex w-2/6 justify-center items-center'>
					<Button
						onClick={selectChoosedCareer}
					>
						Choisir
					</Button>
				</div>
				<LockOverlay
					locked={!chooseCareer}
				/>
			</div>
		</div>
	)
}

export default CareerSelection