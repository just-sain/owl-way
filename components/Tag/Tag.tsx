import React from 'react'
import Link from 'next/link'
import { ITagProps } from './Tag.props'
// styles
import cn from 'classnames'
import styles from './Tag.module.scss'

export const Tag = ({ children, color, size, href, className, ...props }: ITagProps) => {
	return (
		<div
			{...props}
			className={cn(styles.tag, className, {
				[styles.small]: size === 'small',
				[styles.medium]: size === 'medium',
				[styles.large]: size === 'large',
				[styles.ghost]: color === 'ghost',
				[styles.gray]: color === 'gray',
				[styles.green]: color === 'green',
				[styles.red]: color === 'red',
				[styles.primary]: color === 'primary'
			})}>
			{href ? (
				<Link href={href}>
					<a target='_blank'>{children}</a>
				</Link>
			) : (
				children
			)}
		</div>
	)
}
