import { ITextareaProps } from './Textarea.props'
// styles
import cn from 'classnames'
import styles from './Textarea.module.scss'

export const Textarea = ({ className, inputRef, ...props }: ITextareaProps) => {
	return (
		<div className={cn(className, styles.wrapper)}>
			<textarea className={styles.textarea} ref={inputRef && inputRef} {...props} />
		</div>
	)
}
