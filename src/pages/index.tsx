import type { NextPage } from 'next'
import { useRouter } from 'next/router';

import { Button, Flap } from 'components'

const Home: NextPage = () => {
	const router = useRouter();

	return (
		<div className='flex flex-col justify-center items-center'>
			<span className='mb-4 font-bold text-xl'>Preview</span>
			<Button
				onClick={() => router.push('/character-creation')}
			>
				Créer un personnage
			</Button>
			<Flap
				label='Coucou'
				secondaryLabel='test'
			/>
		</div>
	)
}

export default Home
