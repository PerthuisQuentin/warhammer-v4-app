import { FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import Random from 'random'

interface Props {
	className?: string
	value?: number
	max: number
	oneRoll?: boolean
	onRolled?: (value: number) => void
}

const Dice: FunctionComponent<Props> = ({
	className = '',
	value,
	max,
	oneRoll = false,
	onRolled,
}) => {
	const [isRolling, setIsRolling] = useState<boolean>(false)
	const [rollingNumber, setRollingNumber] = useState<number>(0)
	const [hasRolled, setHasRolled] = useState<boolean>(false)

	const disabled = !isRolling && oneRoll && hasRolled

	const rollDice = () => {
		if (isRolling) return
		if (oneRoll && hasRolled) return
		setHasRolled(true)
		setRollingNumber(Random.int(1, max))
		setIsRolling(true)
		setTimeout(() => {
			setIsRolling(false)
		}, 500)
	}

	useEffect(() => {
		if (isRolling) setTimeout(() => {
			setRollingNumber(Random.int(1, max))
		}, 100)
	}, [rollingNumber, max])

	useEffect(() => {
		if (!isRolling && hasRolled) {
			onRolled && onRolled(rollingNumber)
		}
	}, [isRolling])

	const colorsStyle = isRolling
		? 'bg-purple-900 border-purple-700 cursor-default'
		: 'bg-purple-800 border-purple-600 hover:bg-purple-900 hover:border-purple-700'

	const disabledStyle = disabled
		? 'opacity-75 cursor-default pointer-events-none'
		: ''

	let sizeStyle = 'w-12 h-12'
	if (max <= 10) sizeStyle = 'w-10 h-10'

	return (
		<div
			className={`flex justify-center items-center border-2 rounded-lg font-bold text-2xl cursor-pointer ${sizeStyle} ${colorsStyle} ${disabledStyle} ${className}`}	
			onClick={rollDice}
		>
			{isRolling ? rollingNumber : (value ?? max)}
		</div>
	)
}

export default Dice