import { FunctionComponent } from 'react'

import { FlapColor } from 'types'

const FlapColorToPrimaryColor: Record<FlapColor, string> = {
	[FlapColor.Default]: 'bg-gray-500',
	[FlapColor.Blue]: 'bg-sky-700',
	[FlapColor.Yellow]: 'bg-yellow-600',
	[FlapColor.Green]: 'bg-green-700',
	[FlapColor.Red]: 'bg-red-700'
}

const FlapColorToSecondaryColor: Record<FlapColor, string> = {
	[FlapColor.Default]: 'bg-gray-400',
	[FlapColor.Blue]: 'bg-sky-600',
	[FlapColor.Yellow]: 'bg-yellow-500',
	[FlapColor.Green]: 'bg-green-600',
	[FlapColor.Red]: 'bg-red-600'
}

const FlapColorToHoverPrimaryColor: Record<FlapColor, string> = {
	[FlapColor.Default]: 'group-hover:bg-gray-400',
	[FlapColor.Blue]: 'group-hover:bg-sky-600',
	[FlapColor.Yellow]: 'group-hover:bg-yellow-500',
	[FlapColor.Green]: 'group-hover:bg-green-600',
	[FlapColor.Red]: 'group-hover:bg-red-600'
}

const FlapColorToHoverSecondaryColor: Record<FlapColor, string> = {
	[FlapColor.Default]: 'group-hover:bg-gray-300',
	[FlapColor.Blue]: 'group-hover:bg-sky-500',
	[FlapColor.Yellow]: 'group-hover:bg-yellow-400',
	[FlapColor.Green]: 'group-hover:bg-green-500',
	[FlapColor.Red]: 'group-hover:bg-red-500'
}

interface Props {
	className?: string
	label: string
	secondaryLabel?: string
	color?: FlapColor
	onClick?: () => void
}

const Flap: FunctionComponent<Props> = ({
	className = '',
	label,
	secondaryLabel,
	color = FlapColor.Default,
	onClick,
}) => {
	const click = () => onClick && onClick()

	const flapStyle = onClick
		? 'cursor-pointer'
		: ''

	const firstLabelStyle = secondaryLabel
		? 'rounded-l-lg'
		: 'rounded-lg'

	const primaryColorStyle = onClick
		? `${FlapColorToPrimaryColor[color]} ${FlapColorToHoverPrimaryColor[color]}`
		: FlapColorToPrimaryColor[color]

	const secondaryColorStyle = onClick
		? `${FlapColorToSecondaryColor[color]} ${FlapColorToHoverSecondaryColor[color]}`
		: FlapColorToSecondaryColor[color]

	return (
		<span
			className={`group flex items-center text-sm ${flapStyle} ${className}`}
			onClick={click}
		>
			<span className={`py-1 px-2 bg-gray-500 ${firstLabelStyle} ${primaryColorStyle}`}>
				{label}
			</span>
			{secondaryLabel && (
				<span className={`py-1 px-2 bg-gray-400 rounded-r-lg ${secondaryColorStyle}`}>
					{secondaryLabel}
				</span>
			)}
		</span>
	)
}

export default Flap