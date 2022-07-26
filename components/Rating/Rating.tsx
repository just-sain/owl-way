import React, { KeyboardEvent, useEffect, useState } from 'react'
import { IRatingProps } from './Rating.props'
// styles
import cn from 'classnames'
import styles from './Rating.module.scss'
import StarIcon from './star.svg'

export const Rating = ({ isEditable = false, rating, setRating, className, ...props }: IRatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

	useEffect(() => {
		constructRating(rating)
	}, [rating])

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
			<StarIcon
				key={i}
				className={cn(styles.star, {
					[styles.fill]: i < currentRating
				})}
				onMouseEnter={() => changeDisplay(i + 1)}
				onClick={() => onClick(i + 1)}
				tabIndex={isEditable ? 0 : -1}
				onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
			/>
		))

		setRatingArray(updatedArray)
	}

	const changeDisplay = (i: number) => {
		if (!isEditable) return
		constructRating(i)
	}

	const onClick = (i: number) => {
		if (!isEditable || !setRating) return

		setRating(i)
	}

	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if ((e.code !== 'Space' && e.code !== 'Enter') || !setRating) return

		setRating(i)
	}

	return (
		<div {...props} className={cn(className, { [styles.editable]: isEditable })} onMouseLeave={() => changeDisplay(rating)}>
			{ratingArray.map((r: JSX.Element, i: number) => (
				<span key={i}>{r}</span>
			))}
		</div>
	)
}
