import { NextPage } from 'next'

interface Props {
	children: React.ReactNode,
	className?: string,
}

const TextSeparator: NextPage<Props> = ({
	children,
	className = '',
}) => {
	return (
		<div className={`flex justify-center items-center ${className}`}>
			<hr className='grow h-px border-none bg-gray-500 mx-2'/>
			<span className='text-xl font-bold'>
				{children}
			</span>
			<hr className='grow h-px border-none bg-gray-500 mx-2'/>
		</div>
	)
}

export default TextSeparator