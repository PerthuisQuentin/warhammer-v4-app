import type { AppProps } from 'next/app'

import { Main } from 'components'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Main>
			<Component {...pageProps} />
		</Main>
	)
}

export default App
