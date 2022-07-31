import { ForwardedRef, forwardRef } from 'react';
import { ISearchInputProps } from './SearchInput.props';
// styles
import cn from 'classnames';
import styles from './SearchInput.module.scss';
import SearchIcon from './search.svg';
import { Button } from '../../additional';

export const SearchInput = forwardRef(
	(
		{ className, error, ...props }: ISearchInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(className, styles.wrapper)}>
				<input
					ref={ref}
					className={cn(styles.input, { [styles._error]: error })}
					{...props}
				/>
				<Button
					aria-label="Искать по сайту"
					appearance="primary"
					className={styles.button}
					type="submit"
				>
					<SearchIcon />
				</Button>
				<span className={cn(styles.errorMessage, { [styles._show]: error })}>
					{error && error.message}
				</span>
			</div>
		);
	}
);
