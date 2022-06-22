import { FunctionComponent } from 'react'

interface Props {
	className?: string
	label: string
	secondaryLabel?: string
	color?: string
	secondaryColor?: string
}

const Flap: FunctionComponent<Props> = ({
	className = '',
	label,
	secondaryLabel,
	color,
	secondaryColor,
}) => {
	const firstLabelStyle = secondaryLabel
		? 'rounded-l-full'
		: 'rounded-full'

	const colorStyle = color ?? 'bg-gray-500'
	const secondaryColorStyle = secondaryColor ?? 'bg-gray-400'

	return (
		<span className={`flex items-center text-sm ${className}`}>
			<span className={`py-1 px-2 bg-gray-500 ${firstLabelStyle} ${colorStyle}`}>
				{label}
			</span>
			{secondaryLabel && (
				<span className={`py-1 px-2 bg-gray-400 rounded-r-full ${secondaryColorStyle}`}>
					{secondaryLabel}
				</span>
			)}
		</span>
	)
}

export default Flap