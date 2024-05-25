import { FunctionComponent } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
	children: React.ReactNode,
	open?: boolean,
	title: string,
	onClose?: () => void
}

const Modal: FunctionComponent<Props> = ({
	children,
	open = false,
	title,
	onClose,
}) => {
	const close = () => {
		onClose && onClose()
	}

	return open
		? (
			<>
				<div className='fixed inset-0 w-screen h-screen bg-gray-900 bg-opacity-80 z-30'></div>
				<div className="fixed inset-0 w-screen h-screen z-40 flex justify-center items-center">
					<div className='sm:w-full md:w-8/12 lg:w-6/12 flex justify-center items-center'>
						<div className="rounded-lg shadow bg-gray-700 sm:max-w-screen-sm">
							<div className='flex justify-between items-center p-4 border-b border-gray-600'>
								<span className='mr-8 text-xl text-white'>
									{title}
								</span>
								<XMarkIcon
									className='w-6 h-6 p-px text-white rounded-lg hover:bg-gray-500'
									onClick={close}
								/>
							</div>
							<div className='flex flex-col justify-center items-center p-4'>
								{children}
							</div>
						</div>
					</div>
				</div>
			</>
		)
		: <></>
}

export default Modal