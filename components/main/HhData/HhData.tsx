import { IHhDataProps } from './HhData.props';
import { Card } from '../../additional';
import { priceRule } from '../../../helpers/helpers';
// styles
import cn from 'classnames';
import styles from './HhData.module.scss';
import RateIcon from './rate.svg';

export const HhData = ({
	children,
	className,
	color,
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
	...props
}: IHhDataProps) => {
	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<Card color={color} className={styles.count}>
				<div className={styles.title}>{children}</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card color={color} className={styles.salary}>
				<div className={styles.salaryBlock}>
					<div className={styles.title}>Начальный</div>
					<div className={styles.salaryCount}>{priceRule(juniorSalary)}</div>
					<div className={styles.salaryRate}>
						<RateIcon className={cn(styles.rate, styles._fill)} />
						<RateIcon className={cn(styles.rate)} />
						<RateIcon className={cn(styles.rate)} />
					</div>
				</div>
				<div className={styles.salaryBlock}>
					<div className={styles.title}>Средний</div>
					<div className={styles.salaryCount}>{priceRule(middleSalary)}</div>
					<div className={styles.salaryRate}>
						<RateIcon className={cn(styles.rate, styles._fill)} />
						<RateIcon className={cn(styles.rate, styles._fill)} />
						<RateIcon className={cn(styles.rate)} />
					</div>
				</div>
				<div className={styles.salaryBlock}>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.salaryCount}>{priceRule(seniorSalary)}</div>
					<div className={styles.salaryRate}>
						<RateIcon className={cn(styles.rate, styles._fill)} />
						<RateIcon className={cn(styles.rate, styles._fill)} />
						<RateIcon className={cn(styles.rate, styles._fill)} />
					</div>
				</div>
			</Card>
		</div>
	);
};
