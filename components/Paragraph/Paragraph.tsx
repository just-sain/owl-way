import React from 'react'
import { IParagraphProps } from './Paragraph.props'
// styles
import cn from 'classnames'
import styles from './Paragraph.module.scss'

const Paragraph = ({ children, size = 'medium', className, ...props }: IParagraphProps): JSX.Element => {
	return (
		<p
			{...props}
			className={cn(styles.paragraph, className, {
				[styles.small]: size === 'small',
				[styles.medium]: size === 'medium',
				[styles.large]: size === 'large'
			})}>
			{children}
		</p>
	)
}

export default Paragraph
