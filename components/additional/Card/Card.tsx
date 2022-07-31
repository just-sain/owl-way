import { ForwardedRef, forwardRef } from 'react';
import { ICardProps } from './Card.props';
// styles
import cn from 'classnames';
import styles from './Card.module.scss';
import { motion } from 'framer-motion';

export const Card = motion(
	forwardRef(
		(
			{
				children,
				className,
				color = 'transparent',
				isRounded = false,
				...props
			}: ICardProps,
			ref: ForwardedRef<HTMLDivElement>
		) => {
			return (
				<div
					className={cn(className, styles.card, {
						[styles.white]: color === 'white',
						[styles.gray]: color === 'gray',
						[styles.blue]: color === 'blue',
						[styles.transparent]: color === 'transparent',
						[styles.rounded]: isRounded,
					})}
					ref={ref}
					{...props}
				>
					{children}
				</div>
			);
		}
	)
);
