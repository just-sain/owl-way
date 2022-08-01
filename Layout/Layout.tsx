import React, { FunctionComponent, KeyboardEvent, useEffect, useRef, useState } from 'react';
// interface
import { ThemeModeType } from '../store/app/app.interface';
import { ILayoutProps } from './Layout.props';
import { AppContextProvider, IAppContext } from '../context/app.context';
// store
import { useActions, useTypedSelector } from '../hooks';
// components
import Head from 'next/head';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ButtonIcon } from '../components/main';
// styles
import cn from 'classnames';
import styles from './Layout.module.scss';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const main = useRef<HTMLDivElement>(null);
	const themeMode = useTypedSelector(state => state.app.themeMode);
	const { changeThemeMode } = useActions();

	const setThemeModeLocal = (themeMode: ThemeModeType) => {
		changeThemeMode(themeMode);
	};

	useEffect(() => {
		const themeModeFromLocalStorage = localStorage.getItem('themeMode');

		if (themeModeFromLocalStorage === null) {
			setThemeModeLocal('light');
		} else {
			setThemeModeLocal(themeModeFromLocalStorage === 'dark' ? 'dark' : 'light');
		}
	}, []);

	const skipContentHandler = (key: KeyboardEvent) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			main.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<>
			<Head>
				<link rel='stylesheet' href={themeMode === 'dark' ? '/style-modes/darkMode.css' : '/style-modes/lightMode.css'} />
				<title>Owl way | by just.sain</title>
			</Head>
			<div
				className={cn(styles.wrapper, {
					[styles.dark]: themeMode === 'dark',
					[styles.light]: themeMode === 'light'
				})}>
				<Header className={styles.header} />
				<a
					className={cn(styles.skipLink, {
						[styles.displayed]: isSkipLinkDisplayed
					})}
					onFocus={() => setIsSkipLinkDisplayed(true)}
					onKeyDown={skipContentHandler}
					tabIndex={1}>
					Сразу к содержанию
				</a>
				<ButtonIcon role={'button'} aria-label='Наверх' className={styles.up} icon='up' appearance='primary' logic='up' />
				<Sidebar className={styles.sidebar} />
				<main role={'main'} ref={main} className={styles.main} tabIndex={0}>
					{children}
				</main>
				<Footer className={styles.footer} />
			</div>
		</>
	);
};

const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>): ((props: T) => JSX.Element) => {
	return (props: T): JSX.Element => (
		<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
			<Layout>
				<Component {...props} />
			</Layout>
		</AppContextProvider>
	);
};

export default withLayout;
