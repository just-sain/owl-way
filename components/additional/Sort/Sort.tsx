import { ISortProps, SortEnum } from './Sort.props';
// styles
import cn from 'classnames';
import styles from './Sort.module.scss';
import SortIcon from './sort.svg';
import { KeyboardEvent } from 'react';

export const Sort = ({
	className,
	sort,
	setSort,
	...props
}: ISortProps): JSX.Element => {
	const sortKeyDownHandler = (key: KeyboardEvent, sortType: SortEnum) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			setSort(sortType);
		}
	};

	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<div className={styles.sortName} id="sort">
        Сортировка
			</div>
			<button
				id="rating"
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby="sort rating"
				onClick={() => setSort(SortEnum.Rating)}
				tabIndex={0}
				onKeyDown={(key: KeyboardEvent) =>
					sortKeyDownHandler(key, SortEnum.Rating)
				}
				className={cn(styles.sort, {
					[styles._active]: sort === SortEnum.Rating,
				})}
			>
				<SortIcon className={styles.icon} />
				<span className={styles.text}>По рейтингу</span>
			</button>
			<button
				id="price"
				aria-selected={sort === SortEnum.Price}
				aria-labelledby="sort price"
				onClick={() => setSort(SortEnum.Price)}
				tabIndex={0}
				onKeyDown={(key: KeyboardEvent) =>
					sortKeyDownHandler(key, SortEnum.Price)
				}
				className={cn(styles.sort, {
					[styles._active]: sort === SortEnum.Price,
				})}
			>
				<SortIcon className={styles.icon} />
				<span className={styles.text}>По цене</span>
			</button>
		</div>
	);
};
