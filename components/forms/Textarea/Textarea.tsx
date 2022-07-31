import { forwardRef } from 'react';
import { ITextareaProps } from './Textarea.props';
// styles
import cn from 'classnames';
import styles from './Textarea.module.scss';
import { ForwardedRef } from 'react';

export const Textarea = forwardRef(
	(
		{ className, placeholder, error, ...props }: ITextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cn(className, styles.wrapper)}>
				<textarea
					aria-label={placeholder}
					className={cn(styles.textarea, { [styles._error]: error })}
					ref={ref}
					{...props}
					placeholder={placeholder}
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
