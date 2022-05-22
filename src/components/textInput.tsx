import { NextPage } from 'next';

interface Props {
	id: string
	label: string
	placeholder: string
	value: string
	onChange: Function
}

const TextInput: NextPage<Props> = ({
	id,
	label,
	placeholder,
	value,
	onChange
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(event.target.value)
	}

	return (
		<div>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-gray-300"
			>
				{label}
			</label>
			<input
				type="text"
				id={id}
				className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}

export default TextInput