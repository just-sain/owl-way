import React, { ForwardedRef, forwardRef } from 'react';
import { IButtonProps } from './Button.props';
// components
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import ArrowIcon from './arrow.svg';
// styles
import cn from 'classnames';
import styles from './Button.module.scss';

export const Button = forwardRef(
	({ children, className, appearance, arrow = 'none', href, ...props }: IButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
		const scale = useMotionValue(1);

		const button = (
			<motion.button
				ref={ref}
				className={cn(className, styles.button, {
					[styles.primary]: appearance === 'primary',
					[styles.ghost]: appearance === 'ghost',
					[styles.transparent]: appearance === 'transparent'
				})}
				style={{ scale }}
				whileHover={{ scale: 1.05 }}
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
			</motion.button>
		);

		if (!href) {
			return button;
		} else {
			return (
				<Link href={href} passHref>
					<a tabIndex={-1} target='_blank'>
						{button}
					</a>
				</Link>
			);
		}
	}
);
