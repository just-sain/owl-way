import React, { FunctionComponent, useEffect, useState } from 'react'
import Head from 'next/head'
import { ILayoutProps } from './Layout.props'
import { AppContextProvider, IAppContext } from '../context/app.context'
// components
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
// styles
import cn from 'classnames'
import styles from './Layout.module.scss'

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	const [themeModeState, setThemeModeState] = useState<ThemeModeType>('light')

	useEffect(() => {
		const themeModeFromLocalStorage = localStorage.getItem('themeMode') as ThemeModeType

		if (themeModeFromLocalStorage === null) {
			localStorage.setItem('themeMode', 'light')
			setThemeModeState('light')
		} else {
			setThemeModeState(themeModeFromLocalStorage === 'dark' ? 'dark' : 'light')
		}
	}, [])

	// functions/methods
	const setThemeMode = (themeMode: ThemeModeType) => {
		localStorage.setItem('themeMode', themeMode)
		setThemeModeState(themeMode)
	}

	return (
		<>
			<Head>
				<link rel='stylesheet' href={themeModeState === 'dark' ? '/style-modes/darkMode.css' : '/style-modes/lightMode.css'} />

				<title>Owl way | by just.sain</title>
			</Head>
			<div
				className={cn(styles.wrapper, {
					[styles.dark]: themeModeState === 'dark',
					[styles.light]: themeModeState === 'light'
				})}>
				<Header className={styles.header} />
				<Sidebar setThemeMode={setThemeMode} className={styles.sidebar} />
				<Main className={styles.main}>{children}</Main>
				<Footer className={styles.footer} />
			</div>
		</>
	)
}

const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>): ((props: T) => JSX.Element) => {
	return (props: T): JSX.Element => (
		<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
			<Layout>
				<Component {...props} />
			</Layout>
		</AppContextProvider>
	)
}

export default withLayout

export type ThemeModeType = 'dark' | 'light'
