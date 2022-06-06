import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Random from 'random'

interface Props {
	value?: number
	max: number
	oneRoll?: boolean
	onRolled?: (value: number) => void
}

const Dice: NextPage<Props> = ({
	value,
	max,
	oneRoll = false,
	onRolled
}) => {
	const [isRolling, setIsRolling] = useState<boolean>(false)
	const [rollingNumber, setRollingNumber] = useState<number>(0)
	const [hasRolled, setHasRolled] = useState<boolean>(false)

	const disabled = !isRolling && oneRoll && hasRolled

	useEffect(() => {
		if (isRolling) setTimeout(() => {
			setRollingNumber(Random.int(1, max))
		}, 100)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rollingNumber, max])

	useEffect(() => {
		if (!isRolling && hasRolled) {
			onRolled && onRolled(rollingNumber)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRolling])

	const onClick = () => {
		if (isRolling) return
		if (oneRoll && hasRolled) return
		setHasRolled(true)
		setRollingNumber(Random.int(1, max))
		setIsRolling(true)
		setTimeout(() => {
			setIsRolling(false)
		}, 500)
	}

	const colorsStyle = isRolling
		? 'bg-purple-900 border-purple-700 cursor-default'
		: 'bg-purple-800 border-purple-600 hover:bg-purple-900 hover:border-purple-700'

	const disabledStyle = disabled
		? 'opacity-75 cursor-default pointer-events-none'
		: ''

	return (
		<div
			className={`w-12 h-12 flex justify-center items-center border-2 rounded-lg font-bold text-2xl cursor-pointer ${colorsStyle} ${disabledStyle}`}	
			onClick={onClick}
		>
			{isRolling ? rollingNumber : (value ?? max)}
		</div>
	)
}

export default Dice