import { FunctionComponent } from 'react'

interface Props {
	id: string
	label?: string
	value: string
	options: {
		value: string
		label: string
	}[]
	onChange?: (value: string) => void
}

const SelectInput: FunctionComponent<Props> = ({
	id,
	label,
	value,
	options,
	onChange
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange && onChange(event.target.value)
	}

	const optionItems = options.map(option => (
		<option
			key={option.value}
			value={option.value}
		>
			{option.label}
		</option>
	))

	return (
		<div className='w-full'>
			{label && (
				<label
					htmlFor={id}
					className='block mb-2 text-sm font-medium text-gray-400'
				>
						{label}
				</label>
			)}
			<select
				id={id}
				className='h-10 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
				value={value}
				onChange={handleChange}
			>
				{optionItems}
			</select>
		</div>
	)
}

export default SelectInput