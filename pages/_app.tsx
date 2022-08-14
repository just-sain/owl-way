import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../store/store';
// styles
import '../styles/globals.scss';
import '../styles/variables.css';

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<meta name='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta name='og:locale' content='ru_RU' />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default wrapper.withRedux(MyApp);
