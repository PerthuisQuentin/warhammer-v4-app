import { FunctionComponent } from 'react'

interface Props {
	id: string
	checked?: boolean
	onToggle?: (checked: boolean) => void
}

const Toggle: FunctionComponent<Props> = ({
	id,
	checked = false,
	onToggle,
}) => {
	const toggle = () => {
		onToggle && onToggle(!checked)
	}

	return (
		<label
			htmlFor={id}
			className="inline-flex relative items-center cursor-pointer"
			onClick={toggle}
		>
			<input
				id={id}
				type="checkbox"
				className="sr-only peer"
				value=""
				checked={checked}
			/>
			<div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
		</label>
	)
}

export default Toggle