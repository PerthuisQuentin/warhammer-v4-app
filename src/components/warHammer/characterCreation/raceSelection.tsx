import { NextPage } from 'next'
import { useState } from 'react'

import { CreationSelectionLine, Button, SelectInput, LockOverlay } from 'components'
import { Race } from 'models'

import WarHammer from 'warHammer'

const raceOptions = WarHammer.races
	.map(race => ({
		label: race.name,
		value: race.id
	}))

const XP_ON_ROLLED_RACE = 20
const XP_ON_CHOOSED_RACE = 0

interface Props {
	onRaceSelected?: (event: { race: Race, xp: number }) => void
}

const RaceSelection: NextPage<Props> = ({
	onRaceSelected,
}) => {
	const [roll, setRoll] = useState<number | undefined>()
	const [race, setRace] = useState<Race | undefined>()

	const [chooseRace, setChooseRace] = useState<boolean>(false)
	
	const [raceSelected, setRaceSelected] = useState<string>(WarHammer.races[0].id)

	const setRolledRace = (roll: number) => {
		const rolledRace = WarHammer.getRaceByRoll(roll)
		if (!rolledRace) throw new Error(`No race on roll ${roll}`)

		setRoll(roll)
		setRace(rolledRace)
	}

	const selectRolledRace = () => {
		onRaceSelected && onRaceSelected({
			race: race!,
			xp: XP_ON_ROLLED_RACE
		})
	}

	const selectChoosedRace = () => {
		const choosedRace = WarHammer.getRace(raceSelected)
		if (!choosedRace) throw new Error(`No race for id ${raceSelected}`)
		onRaceSelected && onRaceSelected({
			race: choosedRace,
			xp: XP_ON_CHOOSED_RACE
		})
	}

	return (
		<div className='w-full flex flex-col'>
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold mb-2'>
					Choix de la race
				</span>
				<span className='font-bold mb-2'>
					+{chooseRace ? XP_ON_CHOOSED_RACE : XP_ON_ROLLED_RACE} PX
				</span>
			</div>
			<div className='relative p-4'>
				<CreationSelectionLine
					roll={roll}
					label={race?.name}
					buttonLabel='Choisir'
					onRoll={setRolledRace}
					onChoose={selectRolledRace}
				/>
				<LockOverlay
					locked={chooseRace}
				/>
			</div>
			<div className='flex justify-center items-center my-4'>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
				<span className='text-xl font-bold'>ou</span>
				<hr className='grow h-px border-none bg-gray-500 mx-2'/>
			</div>
			<div className='flex justify-center mb-4'>
				<Button
					disabled={chooseRace}
					onClick={() => setChooseRace(true)}
				>
					Choisir la race ({XP_ON_CHOOSED_RACE - XP_ON_ROLLED_RACE} PX)
				</Button>
			</div>
			<div className='relative flex justify-center p-4'>
				<div className='flex w-4/6 justify-center items-center'>
					<SelectInput
						id='raceSelectInput'
						value={raceSelected}
						options={raceOptions}
						onChange={setRaceSelected}
					/>
				</div>
				<div className='flex w-2/6 justify-center items-center'>
					<Button
						onClick={selectChoosedRace}
					>
						Choisir
					</Button>
				</div>
				<LockOverlay
					locked={!chooseRace}
				/>
			</div>
		</div>
	)
}

export default RaceSelection