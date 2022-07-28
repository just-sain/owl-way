import React from 'react'
import { IButtonProps } from './Button.props'
import Link from 'next/link'
import ArrowIcon from './arrow.svg'
// styles
import cn from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ children, className, appearance, arrow = 'none', href, ...props }: IButtonProps): JSX.Element => {
	const button = (
		<button
			className={cn(className, styles.button, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost'
			})}
			{...props}>
			{children}
			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow === 'down'
					})}>
					<ArrowIcon />
				</span>
			)}
		</button>
	)

	if (!href) {
		return button
	} else {
		return (
			<Link href={href} passHref>
				<a target='_blank'>{button}</a>
			</Link>
		)
	}
}
