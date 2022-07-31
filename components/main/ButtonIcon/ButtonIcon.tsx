import React, { ForwardedRef, forwardRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '../../../hooks';
import { IButtonIconProps, icons } from './ButtonIcon.props';
// styles
import cn from 'classnames';
import styles from './ButtonIcon.module.scss';

export const ButtonIcon = forwardRef(
	(
		{
			className,
			appearance = 'white',
			icon,
			logic,
			...props
		}: IButtonIconProps,
		ref: ForwardedRef<HTMLButtonElement>
	): JSX.Element => {
		const controls = useAnimation();
		const y = useScrollY();

		useEffect(() => {
			controls.start({
				opacity: y / (document.body.scrollHeight / 2),
				height: y / (document.body.scrollHeight / 2) > 0 ? '4rem' : 0,
			});
		}, [y, controls]);

		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		};

		const Icon = icons[icon];

		switch (logic) {
		case 'up': {
			return (
				<motion.button
					{...props}
					ref={ref}
					className={cn(className, styles.button, styles.up, {
						[styles.primary]: appearance === 'primary',
						[styles.white]: appearance == 'white',
					})}
					initial={{ opacity: 0 }}
					animate={controls}
					onClick={scrollToTop}
				>
					<Icon className={styles.icon} />
				</motion.button>
			);
		}
		case 'just-btn': {
			return (
				<motion.button
					{...props}
					className={cn(className, styles.button, styles.close, {
						[styles.primary]: appearance === 'primary',
						[styles.white]: appearance == 'white',
					})}
				>
					<Icon className={styles.icon} />
				</motion.button>
			);
		}
		}
	}
);
