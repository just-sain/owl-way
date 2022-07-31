import Link from 'next/link';
import { ILogoProps } from './Logo.props';
// styles
import cn from 'classnames';
import styles from './Logo.module.scss';
import LogoIcon from '/public/logo.svg';

export const Logo = ({ className }: ILogoProps) => {
	return (
		<Link href={'/'}>
			<a className={cn(className, styles.logo)}>
				<LogoIcon />
				<p>
          Owl <span>Way</span>
				</p>
			</a>
		</Link>
	);
};
