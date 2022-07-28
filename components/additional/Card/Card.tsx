import { ICardProps } from './Card.props'
import cn from 'classnames'
import styles from './Card.module.scss'

export const Card = ({ children, className, color = 'transparent', isRounded = false, ...props }: ICardProps) => {
	return (
		<div
			className={cn(className, styles.card, {
				[styles.white]: color === 'white',
				[styles.gray]: color === 'gray',
				[styles.blue]: color === 'blue',
				[styles.transparent]: color === 'transparent',
				[styles.rounded]: isRounded
			})}
			{...props}>
			{children}
		</div>
	)
}
