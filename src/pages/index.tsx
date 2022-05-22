import type { NextPage } from 'next'

import CareersList from '../components/careersList'

const Home: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-900 text-white'>
      <h1 className='text-4xl mt-4 font-bold'>WarHammer V4</h1>
      <h2 className='text-2xl my-2'>Liste des carrières</h2>
      <CareersList/>
    </div>
  )
}

export default Home
