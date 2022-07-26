import { ITextareaProps } from './Textarea.props'
// styles
import cn from 'classnames'
import styles from './Textarea.module.scss'

export const Textarea = ({ className, ...props }: ITextareaProps) => {
	return (
		<div className={styles.wrapper}>
			<textarea className={cn(className, styles.textarea)} {...props} />
		</div>
	)
}
