import { FunctionComponent } from 'react'

import { Button, Dice } from 'components'

interface Props {
	className?: string
	roll?: number
	label?: string
	buttonLabel: string
	onRoll?: (roll: number) => void
	onChoose?: () => void
}

const CreationSelectionLine: FunctionComponent<Props> = ({
	className = '',
	roll,
	label,
	buttonLabel,
	onRoll,
	onChoose,
}) => {
	const firstRolled = label
		? 'opacity-100'
		: 'opacity-0 -translate-x-10'

	return (
		<div className={`w-full flex ${className}`}>
			<div className='flex w-1/6 justify-center items-center'>
				<Dice
					value={roll}
					max={100}
					oneRoll={true}
					onRolled={onRoll}
				/>
			</div>
			<div className='flex w-3/6 justify-center items-center'>
				<span className={`font-bold text-xl transition duration-1000 ${firstRolled}`}>
					{label}
				</span>
			</div>
			<div className='flex w-2/6 justify-center items-center'>
				<Button
					onClick={onChoose}
					disabled={!roll}
				>
					{buttonLabel}
				</Button>
			</div>	
		</div>
	)
}

export default CreationSelectionLine