import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';
import { wrapper } from '../store/store';
// styles
import '../styles/globals.scss';
import '../styles/variables.css';

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
	Router.events.on('routeChangeComplete', (url: string) => {
		if (typeof window !== 'undefined') {
			ym('hit', url);
		}
	});

	return (
		<>
			<Head>
				<meta name='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta name='og:locale' content='ru_RU' />
				<link rel='preconnect' href='https://mc.yandex.ru' />
			</Head>
			<YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version='2' />
			<Component {...pageProps} />
		</>
	);
};

export default wrapper.withRedux(MyApp);
