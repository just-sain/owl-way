import { IErrorCodeProps } from './ErrorCode.props';
import { HTag, Paragraph } from '../../additional';
// styles
import cn from 'classnames';
import styles from './ErrorCode.module.scss';

export const ErrorCode = ({ className, children, errorCode, ...props }: IErrorCodeProps) => {
	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<HTag tag='h1' className={styles.heading}>
				Ошибка <span className={styles.errorCode}>{errorCode}</span>
			</HTag>
			<Paragraph size='large' className={styles.text}>
				{children}
			</Paragraph>
		</div>
	);
};
