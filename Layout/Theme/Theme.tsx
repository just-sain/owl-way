import { IThemeProps } from './Theme.props';
// components
import SunIcon from './sun.svg';
import MoonIcon from './moon.svg';
import { Button, HTag } from '../../components/additional';
//styles
import cn from 'classnames';
import styles from './Theme.module.scss';

const Theme = ({ className, themeMode, setThemeMode, ...props }: IThemeProps): JSX.Element => {
	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<HTag tag='h2' className={styles.title} id='themeTitle'>
				Тема
			</HTag>
			<Button
				id='themeMode'
				aria-label={themeMode === 'light' ? 'Выбрано светлое тема' : 'Выбрано темная тема'}
				aria-labelledby='themeTitle themeMode'
				className={styles.button}
				appearance='ghost'
				onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
				{themeMode === 'light' ? <MoonIcon /> : <SunIcon />}
			</Button>
		</div>
	);
};

export default Theme;
