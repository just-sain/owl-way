import { ISortProps, SortEnum } from './Sort.props'
// styles
import cn from 'classnames'
import styles from './Sort.module.scss'
import SortIcon from './sort.svg'

export const Sort = ({ className, sort, setSort, ...props }: ISortProps): JSX.Element => {
	return (
		<div className={cn(className, styles.wrapper)} {...props}>
			<p onClick={() => setSort(SortEnum.Rating)} className={cn(styles.sort, { [styles._active]: sort === SortEnum.Rating })}>
				<SortIcon className={styles.icon} />
				<span className={styles.text}>По рейтингу</span>
			</p>
			<p onClick={() => setSort(SortEnum.Price)} className={cn(styles.sort, { [styles._active]: sort === SortEnum.Price })}>
				<SortIcon className={styles.icon} />
				<span className={styles.text}>По цене</span>
			</p>
		</div>
	)
}
