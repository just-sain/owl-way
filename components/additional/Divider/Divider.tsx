import { IDividerProps } from './Divider.props';
// styles
import cn from 'classnames';
import styles from './Divider.module.scss';

export const Divider = ({ className, ...props }: IDividerProps) => {
	return <hr className={cn(className, styles.divider)} {...props} />;
};
