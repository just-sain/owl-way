import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '../../context/app.context'
import { firstLevelMenu } from '../../helpers/helpers'
import Link from 'next/link'
// interfaces
import { IPageItem } from '../../interfaces/menu.interface'
// styles
import cn from 'classnames'
import styles from './Menu.module.scss'

const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext)
	const router = useRouter()
	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map(m => {
					if (m._id.secondCategory === secondCategory) m.isOpen = !m.isOpen
					return m
				})
			)
	}

	const firstLevelFrag = (): JSX.Element => (
		<>
			{firstLevelMenu.map(menuItem => (
				<div key={menuItem.route}>
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
				</div>
			))}
		</>
	)
	const secondLevelFrag = (route: string): JSX.Element => (
		<div className={styles.secondBlock}>
			{menu.map(m => {
				if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
					m.isOpen = true
				}
				return (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>
							{m._id.secondCategory}
						</div>
						<div className={cn(styles.secondLevelBlock, { [styles._active]: m.isOpen })}>{thirdLevelFrag(m.pages, route)}</div>
					</div>
				)
			})}
		</div>
	)
	const thirdLevelFrag = (pages: IPageItem[], route: string): JSX.Element => (
		<>
			{pages.map(page => (
				<Link href={`/${route}/${page.alias}`} key={page.title}>
					<a className={cn(styles.thirdLevel, { [styles._active]: `/${route}/${page.alias}` === router.asPath })}>{page.category}</a>
				</Link>
			))}
		</>
	)

	return <div className={styles.menu}>{firstLevelFrag()}</div>
}

export default Menu
