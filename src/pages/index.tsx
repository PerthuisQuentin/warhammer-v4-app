import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
	return (
		<div className='flex justify-center items-center text-xl font-bold text-white'>
			<Link
				href='/character-creation'
				passHref
			>
				<button
					type='button'
					className='text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
				>
					Créer un personnage
				</button>
			</Link>
		</div>
	)
}

export default Home
