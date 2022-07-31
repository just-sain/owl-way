import React from 'react';
import { IParagraphProps } from './Paragraph.props';
// styles
import cn from 'classnames';
import styles from './Paragraph.module.scss';

export const Paragraph = ({
	children,
	size = 'medium',
	className,
	...props
}: IParagraphProps): JSX.Element => {
	return (
		<p
			{...props}
			className={cn(className, styles.paragraph, {
				[styles.small]: size === 'small',
				[styles.medium]: size === 'medium',
				[styles.large]: size === 'large',
			})}
		>
			{children}
		</p>
	);
};
