
import { NextPage } from 'next'
import Head from 'next/head'

import { Header, Navigation } from 'components'

const Main: NextPage = ({ children }) => {
	return (
		<div className='flex min-h-screen flex-col items-center bg-gray-900 text-white'>
			<Head>
				<title>WarHammer App</title>
			</Head>
			<div className='w-full h-32 py-4 flex flex-col'>
				<Header/>
				<Navigation/>
			</div>
			<div className='w-full grow flex flex-col items-center sm:w-full md:w-8/12 lg:w-6/12 p-4'>
				{children}
			</div>
		</div>
	)
}

export default Main