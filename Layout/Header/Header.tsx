import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import { IHeaderProps } from './Header.props';
// components
import { Logo } from '../../components/additional';
import { ButtonIcon } from '../../components/main';
import Sidebar from '../Sidebar/Sidebar';
//styles
import cn from 'classnames';
import styles from './Header.module.scss';

const Header = forwardRef(
	(
		{ className, ...props }: IHeaderProps,
		ref: ForwardedRef<HTMLElement>
	): JSX.Element => {
		const router = useRouter();
		const shouldReduceMotion = useReducedMotion();
		const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);

		useEffect(() => {
			setIsSidebarOpened(false);
		}, [router]);

		// animation variant
		const sidebarVariants = {
			opened: {
				opacity: 1,
				x: 0,

				transition: {
					stiffness: 20,
				},
			},
			closed: {
				opacity: shouldReduceMotion ? 0 : 1,
				x: '100%',

				transition: shouldReduceMotion
					? {}
					: {
						stiffness: 20,
					},
			},
		};

		return (
			<header {...props} className={cn(className, styles.header)} ref={ref}>
				<Logo className={styles.logo} />
				<ButtonIcon
					logic="just-btn"
					icon="menu"
					appearance="white"
					onClick={() => setIsSidebarOpened(true)}
				/>
				<motion.div
					className={styles.burgerMenu}
					variants={sidebarVariants}
					initial="closed"
					animate={isSidebarOpened ? 'opened' : 'closed'}
				>
					<Sidebar />
					<ButtonIcon
						className={styles.menuClose}
						logic="just-btn"
						icon="close"
						appearance="white"
						onClick={() => setIsSidebarOpened(false)}
					/>
				</motion.div>
			</header>
		);
	}
);

export default Header;
