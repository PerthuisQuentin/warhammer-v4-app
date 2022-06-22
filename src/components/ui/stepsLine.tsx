import { FunctionComponent } from 'react'

interface Props {
	steps: number
	currentStep: number
	className?: string
}

const StepsLine: FunctionComponent<Props> = ({
	steps = 1,
	currentStep,
	className
}) => {
	const createSeparator = (key: number) => (
		<hr
			key={`separator-${key}`}
			className='grow h-px border-none bg-gray-500 mx-2'
		/>
	)
	
	const items = []
	items.push(createSeparator(0))

	for (let step = 1; step <= steps; step++) {
		const stepStyle = step === currentStep
			? 'bg-blue-600'
			: 'bg-gray-500'

		items.push(
			<div
				key={step}
				className={`w-8 h-8 my-2 pt-px flex justify-center items-center font-bold rounded-full ${stepStyle}`}
			>
				{step}
			</div>
		)

		items.push(createSeparator(step))
	}

	return (
		<div className={`w-full flex justify-center items-center ${className}`}>
			{items}
		</div>
		
	)
}

export default StepsLine