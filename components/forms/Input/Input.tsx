import { ForwardedRef, forwardRef } from 'react';
import { IInputProps } from './Input.props';
// styles
import cn from 'classnames';
import styles from './Input.module.scss';

export const Input = forwardRef(
	(
		{ className, error, ...props }: IInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(className, styles.wrapper)}>
				<input
					className={cn(styles.input, { [styles._error]: error })}
					ref={ref}
					{...props}
				/>
				<span
					role={'alert'}
					className={cn(styles.errorMessage, { [styles._show]: error })}
				>
					{error && error.message}
				</span>
			</div>
		);
	}
);
