import { NextPage } from 'next'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

interface Props {
	locked: boolean
}

const DELAY = 300

const LockOverlay: NextPage<Props> = ({
	locked = true,
}) => {
	const [visible, setVisible] = useState<boolean>(locked)

	useEffect(() => {
		if (locked) {
			setVisible(true)
		} else {
			setTimeout(() => {
				setVisible(false)
			}, DELAY)
		}
	}, [locked])

	const overlayStyle = locked
		? 'opacity-50'
		: 'opacity-0'

	const lockStyle = locked
		? 'opacity-100'
		: 'opacity-0'

	const visibilityStyle = visible
		? 'visible'
		: 'invisible'

	return (
		<>
			<div className={`absolute w-full h-full top-0 left-0 rounded-lg bg-gray-400 transition duration-${DELAY} ${overlayStyle} ${visibilityStyle}`} />
			<div className={`absolute w-full h-full top-0 left-0 flex justify-center items-center transition duration-${DELAY} ${lockStyle} ${visibilityStyle}`}>
				<LockClosedIcon className='w-16 h-16 text-white' />
			</div>
		</>
		
	)
}

export default LockOverlay