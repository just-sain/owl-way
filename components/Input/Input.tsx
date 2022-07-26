import { IInputProps } from './Input.props'
import { Button } from '../Button/Button'
// styles
import cn from 'classnames'
import styles from './Input.module.scss'
import SearchIcon from './search.svg'

export const Input = ({ className, withButton = false, ...props }: IInputProps) => {
	if (!withButton)
		return (
			<div className={styles.wrapper}>
				<input className={cn(className, styles.input)} {...props} />
			</div>
		)
	else
		return (
			<div className={cn(styles.wrapper, styles._withBtn)}>
				<input className={cn(className, styles.input)} {...props} />
				<Button appearance='primary' className={styles.button} type='submit'>
					<SearchIcon />
				</Button>
			</div>
		)
}
