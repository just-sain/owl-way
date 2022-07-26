import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { store } from '../store/store'

import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
