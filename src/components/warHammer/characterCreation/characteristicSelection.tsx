import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import {
	Button,
	CharacteristicsCreation,
	CharacteristicsDistributable,
	CharacteristicsReorganizable,
	FinalCharacteristics,
	LockOverlay,
	TextSeparator,
} from 'components'
import { Race } from 'models'
import { useMap } from 'hooks'

import WarHammer from 'warHammer'

const XP_ON_RANDOM_CHARACTERISTICS = 50
const XP_ON_REORGANIZED_CHARACTERISTICS = 25
const XP_ON_DISTRIBUTED_OR_REROLLED_CHARACTERISTICS = 0

const initialCharacteristicsDistributedEntries: [string, number][] = WarHammer.characteristics.map(characteristic => [characteristic.id, 10])

interface Props {
	race?: Race
	onCharacteristicsSelected?: (event: {
		characteristics: ReadonlyMap<string, number>,
		xp: number,
	}) => void
}

const CharacteristicSelection: NextPage<Props> = ({
	race,
	onCharacteristicsSelected,
}) => {
	const [characteristicsRolls, { set: setCharacteristicRoll, reset: resetCharacteristicsRolls }] = useMap<string, number>()
	const [characteristicsDistributed, { set: setCharacteristicDistributed }] = useMap<string, number>(initialCharacteristicsDistributedEntries)
	const [finalCharacteristics, { setAll: setFinalCharacteristics }] = useMap<string, number>()

	const [reRolled, setReRolled] = useState<boolean>(false)
	const [reorganized, setReorganized] = useState<boolean>(false)
	const [distributed, setDistributed] = useState<boolean>(false)
	const [allPointsDistributed, setAllPointsDistributed] = useState<boolean>(true)

	const allRolled = WarHammer.characteristics.every(characteristic => !!characteristicsRolls.get(characteristic.id))

	useEffect(() => {
		const newFinalCharacteristics = new Map<string, number>()

		WarHammer.characteristics.forEach(characteristic => {
			const characteristicValue = distributed
				? characteristicsDistributed.get(characteristic.id)
				: characteristicsRolls.get(characteristic.id)

			if (!characteristicValue) return
			
			const characteristicBonus = race!.getCharacteristicBonus(characteristic.id)!
			newFinalCharacteristics.set(characteristic.id, characteristicBonus + characteristicValue)
		})

		setFinalCharacteristics(newFinalCharacteristics)
	}, [race, distributed, characteristicsRolls, characteristicsDistributed])

	const onCharacteristicRolled = (event: {
		characteristicId: string,
		roll: number,
	}) => {
		const { characteristicId, roll } = event
		setCharacteristicRoll(characteristicId, roll)
	}

	const onReRoll = () => {
		resetCharacteristicsRolls()
		setReRolled(true)
	}

	const onReorganize = (characteristicIdA: string, characteristicIdB: string) => {
		const copy = characteristicsRolls.get(characteristicIdA)!
		setCharacteristicRoll(characteristicIdA, characteristicsRolls.get(characteristicIdB)!)
		setCharacteristicRoll(characteristicIdB, copy)
	}

	const onDistribute = (characteristicId: string, value: number, remainingPoints: number) => {
		setCharacteristicDistributed(characteristicId, value)
		setAllPointsDistributed(remainingPoints === 0)
	}

	const selectCharacteristics = () => {
		const characteristics = distributed
			? characteristicsDistributed
			: characteristicsRolls
		
		let xpGain = XP_ON_RANDOM_CHARACTERISTICS
		if (reorganized) xpGain = XP_ON_REORGANIZED_CHARACTERISTICS
		if (distributed || reRolled) xpGain = XP_ON_DISTRIBUTED_OR_REROLLED_CHARACTERISTICS

		onCharacteristicsSelected && onCharacteristicsSelected({
			characteristics,
			xp: xpGain
		})
	}

	let xp = XP_ON_RANDOM_CHARACTERISTICS
	if (reorganized) xp = XP_ON_REORGANIZED_CHARACTERISTICS
	if (distributed || reRolled) xp = XP_ON_DISTRIBUTED_OR_REROLLED_CHARACTERISTICS

	const xpLossOnReorganization = !reRolled
		? XP_ON_RANDOM_CHARACTERISTICS - XP_ON_REORGANIZED_CHARACTERISTICS
		: XP_ON_DISTRIBUTED_OR_REROLLED_CHARACTERISTICS

	let xpLossOnDistribution = XP_ON_RANDOM_CHARACTERISTICS
	if (reorganized) xpLossOnDistribution = XP_ON_REORGANIZED_CHARACTERISTICS
	if (reRolled) xpLossOnDistribution = XP_ON_DISTRIBUTED_OR_REROLLED_CHARACTERISTICS

	return (
		<div className='w-full flex flex-col'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-2xl font-bold mb-2'>
					Choix des caractéristiques
				</span>
				<span className='font-bold mb-2'>
					+{xp} PX
				</span>
			</div>
			<div className='relative px-2'>
				{!reRolled && (
					<CharacteristicsCreation
						onCharacteristicRolled={onCharacteristicRolled}
					/>
				)}
				{reRolled && (
					<CharacteristicsCreation
						onCharacteristicRolled={onCharacteristicRolled}
					/>
				)}
				<LockOverlay
					locked={reorganized || distributed}
				/>
			</div>
			<div className='flex justify-center mt-4'>
				<Button
					disabled={!allRolled || reRolled}
					onClick={onReRoll}
				>
					Relancer (-{XP_ON_RANDOM_CHARACTERISTICS} PX)
				</Button>
			</div>
			<TextSeparator className='my-4'>
				ou
			</TextSeparator>
			<div className='flex justify-center mb-4'>
				<Button
					disabled={!allRolled || reorganized}
					onClick={() => setReorganized(true)}
				>
					Réorganiser les caractéristiques (-{xpLossOnReorganization} PX)
				</Button>
			</div>
			<div className='relative px-2 py-4'>
				<CharacteristicsReorganizable
					characteristicsRolls={characteristicsRolls}
					onReorganize={onReorganize}
				/>
				<LockOverlay
					locked={!reorganized || distributed}
				/>
			</div>
			<TextSeparator className='my-4'>
				ou
			</TextSeparator>
			<div className='flex justify-center  mb-4'>
				<Button
					disabled={distributed}
					onClick={() => setDistributed(true)}
				>
					Répartir les caractéristiques (-{xpLossOnDistribution} PX)
				</Button>
			</div>
			<div className='relative px-2 py-4'>
				<CharacteristicsDistributable
					characteristicsDistributed={characteristicsDistributed}
					onChange={onDistribute}
				/>
				<LockOverlay
					locked={!distributed}
				/>
			</div>
			<TextSeparator className='my-4'>
				Caractéristiques
			</TextSeparator>
			<FinalCharacteristics
				race={race}
				finalCharacteristics={finalCharacteristics}
			/>
			<div className='flex justify-center mb-4'>
				<Button
					disabled={(!allRolled && !distributed) || (distributed && !allPointsDistributed)}
					onClick={selectCharacteristics}
				>
					Valider
				</Button>
			</div>
		</div>
	)
}

export default CharacteristicSelection