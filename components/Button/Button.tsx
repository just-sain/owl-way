import React from 'react'
import { IButtonProps } from './Button.props'

import ArrowIcon from './arrow.svg'
// styles
import cn from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ children, appearance, arrow = 'none', className, ...props }: IButtonProps): JSX.Element => {
	return (
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
}
