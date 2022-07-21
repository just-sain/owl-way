import { IHTagProps } from './HTag.props'
import styles from './HTag.module.scss'
import cn from 'classnames'

const HTag = ({ children, tag, className, ...props }: IHTagProps): JSX.Element => {
	switch (tag) {
		case 'h1':
			return (
				<h1 {...props} className={cn(styles.h1, className)}>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 {...props} className={cn(styles.h2, className)}>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3 {...props} className={cn(styles.h3, className)}>
					{children}
				</h3>
			)
		case 'h4':
			return (
				<h4 {...props} className={cn(styles.h4, className)}>
					{children}
				</h4>
			)
		default:
			console.warn('worked default value, please update your HTag component')
			return <h1>{children}</h1>
	}
}

export default HTag
