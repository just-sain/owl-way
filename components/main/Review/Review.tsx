import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { IProductProps } from './Review.props'
import { Rating } from '../../additional'
// styles
import cn from 'classnames'
import styles from './Review.module.scss'
import UserIcon from './user.svg'

export const Review = ({ className, review, ...props }: IProductProps) => {
	const { name, _id, createdAt, description, rating, title } = review

	return (
		<div className={cn(className, styles.review)} {...props}>
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:&nbsp;&nbsp;</span>
				<span>{title}</span>
			</div>
			<div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru }).toString()}</div>
			<div className={styles.rating}>
				<Rating rating={rating} />
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	)
}
