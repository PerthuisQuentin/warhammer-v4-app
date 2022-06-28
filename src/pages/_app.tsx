import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { Main } from 'components'
import { store } from 'store'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Main>
				<Component {...pageProps} />
			</Main>
		</Provider>
	)
}

export default App
