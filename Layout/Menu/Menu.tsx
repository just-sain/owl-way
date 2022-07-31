import React, { KeyboardEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../../context/app.context';
import { motion, useReducedMotion } from 'framer-motion';
import { firstLevelMenu } from '../../helpers/helpers';
import Link from 'next/link';
// interfaces
import { IPageItem } from '../../interfaces/menu.interface';
// styles
import cn from 'classnames';
import styles from './Menu.module.scss';

const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const shouldReduceMotion = useReducedMotion();
	const router = useRouter();
	const [announce, setAnnounce] = useState<'close' | 'opened' | undefined>(undefined);
	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map(m => {
					if (m._id.secondCategory === secondCategory) {
						setAnnounce(m.isOpen ? 'close' : 'opened');
						m.isOpen = !m.isOpen;
					}
					return m;
				})
			);
	};

	// animation variants
	const secondLevelVariants = {
		visible: {
			marginBottom: '1rem',
			transition: shouldReduceMotion ? {} : { when: 'afterChildren', staggerChildren: 0.1 }
		},
		hidden: {
			marginBottom: 0
		}
	};
	const thirdLevelVariants = {
		visible: {
			opacity: 1,
			height: 'auto',
			marginBottom: '1rem'
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: 0,
			marginBottom: 0
		}
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const firstLevelFrag = (): JSX.Element => (
		<ul>
			{firstLevelMenu.map(menuItem => (
				<li key={menuItem.route} aria-expended={menuItem.id === firstCategory ? false : true}>
					<Link href={`/${menuItem.route}`}>
						<a
							className={cn(styles.firstLevel, {
								[styles._active]: menuItem.id === firstCategory
							})}>
							{menuItem.icon}
							<span>{menuItem.name}</span>
						</a>
					</Link>
					{menuItem.id === firstCategory && secondLevelFrag(menuItem.route)}
				</li>
			))}
		</ul>
	);
	const secondLevelFrag = (route: string): JSX.Element => (
		<ul className={styles.secondBlock}>
			{menu.map(m => {
				if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
					m.isOpen = true;
				}
				return (
					<li key={m._id.secondCategory}>
						<button
							onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
							className={styles.secondLevel}
							onClick={() => openSecondLevel(m._id.secondCategory)}
							aria-expended={m.isOpen}>
							{m._id.secondCategory}
						</button>
						<motion.ul
							className={styles.secondLevelBlock}
							layout
							variants={secondLevelVariants}
							initial={m.isOpen ? 'visible' : 'hidden'}
							animate={m.isOpen ? 'visible' : 'hidden'}>
							{thirdLevelFrag(m.pages, route, m.isOpen as boolean)}
						</motion.ul>
					</li>
				);
			})}
		</ul>
	);
	const thirdLevelFrag = (pages: IPageItem[], route: string, isVisible: boolean): JSX.Element => (
		<>
			{pages.map(page => (
				<motion.li key={page.title} variants={thirdLevelVariants} className={styles.thirdLevelWrapper}>
					<Link href={`/${route}/${page.alias}`}>
						<a
							tabIndex={isVisible ? 0 : -1}
							aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
							className={cn(styles.thirdLevel, {
								[styles._active]: `/${route}/${page.alias}` === router.asPath
							})}>
							{page.category}
						</a>
					</Link>
				</motion.li>
			))}
		</>
	);

	return (
		<nav role={'navigation'} className={styles.menu}>
			{announce && (
				<span role={'log'} className='visualHidden'>
					{announce === 'opened' ? 'развернуто' : 'свернуто'}
				</span>
			)}
			{firstLevelFrag()}
		</nav>
	);
};

export default Menu;
