import { NextPage } from 'next'

interface Props {
	children: React.ReactNode
	disabled?: boolean
	onClick?: () => void
	innerRef?: (ref: HTMLButtonElement) => void
}

const TextInput: NextPage<Props> = ({
	children,
	disabled = false,
	onClick,
	innerRef,
}) => {
	const style = disabled
		? 'cursor-not-allowed bg-blue-500 opacity-75'
		: 'focus:ring-4 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'

	return (
		<button
			type='button'
			className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${style}`}
			disabled={disabled}
			onClick={onClick}
			ref={innerRef}
		>
			{children}
		</button>
	)
}

export default TextInput