import { IAdvantagesProps } from './Advantages.props'
// styles
import cn from 'classnames'
import styles from './Advantages.module.scss'
import MarkIcon from './mark.svg'
import { Paragraph } from '../Paragraph/Paragraph'

export const Advantages = ({ className, advantages }: IAdvantagesProps) => {
	return (
		<div className={cn(className, styles.advantages)}>
			{advantages.map(advantage => (
				<div key={advantage._id} className={styles.advantage}>
					<div className={styles.mark}>
						<MarkIcon />
					</div>
					<div className={styles.title}>{advantage.title}</div>
					<hr className={styles.line} />
					<Paragraph size='large' className={styles.description}>
						{advantage.description}
					</Paragraph>
				</div>
			))}
		</div>
	)
}
