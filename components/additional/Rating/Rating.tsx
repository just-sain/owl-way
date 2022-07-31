import React, {
	forwardRef,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { IRatingProps } from './Rating.props';
// styles
import cn from 'classnames';
import styles from './Rating.module.scss';
import StarIcon from './star.svg';
import { ForwardedRef } from 'react';

export const Rating = forwardRef(
	(
		{
			className,
			isEditable = false,
			rating,
			setRating,
			tabIndex,
			error,
			...props
		}: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) return -1;
			if (!rating && i === 0) return tabIndex ?? 0;
			if (r === i + 1) return tabIndex ?? 0;
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
				<span
					role={isEditable ? 'slider' : ''}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-valuemin={1}
					aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
					className={styles.starWrapper}
					onMouseEnter={() => changeDisplay(i + 1)}
					onClick={() => onClick(i + 1)}
					tabIndex={computeFocus(rating, i)}
					aria-invalid={error ? true : false}
					onKeyDown={handleKey}
					ref={(r) => ratingArrayRef.current?.push(r)}
					key={i}
				>
					<StarIcon
						className={cn(styles.star, {
							[styles.fill]: i < currentRating,
						})}
					/>
				</span>
			));

			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number) => {
			if (!isEditable) return;
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) return;

			setRating(i);
		};

		const handleKey = (key: KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRating) return;
			if (key.code === 'ArrowRight' || key.code === 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					key.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (key.code === 'ArrowLeft' || key.code === 'ArrowDown') {
				key.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(className, styles.wrapper, {
					[styles.editable]: isEditable,
					[styles._error]: error,
				})}
				onMouseLeave={() => changeDisplay(rating)}
			>
				{ratingArray.map((r: JSX.Element, i: number) => (
					<span key={i}>{r}</span>
				))}
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
