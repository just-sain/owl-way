import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { resetSort, selectSort, selectSortProducts, setSort, setSortProducts } from '../../store/sortReducer'
// interfaces
import { ITopPageProps } from './TopPage.props'
import { TopLevelCategory } from '../../interfaces/page.interface'
import { SortEnum } from '../Sort/Sort.props'
// components
import { HTag } from '../HTag/HTag'
import { HhData } from '../HhData/HhData'
import { Tag } from '../Tag/Tag'
import { Advantages } from '../Advantages/Advantages'
import { Sort } from '../Sort/Sort'
// styles
import cn from 'classnames'
import styles from './TopPage.module.scss'
import { useEffect } from 'react'

export const TopPageComponent = ({ products, firstCategory, page }: ITopPageProps): JSX.Element => {
	const dispatch = useAppDispatch()
	const sort = useAppSelector(selectSort)
	const sortProducts = useAppSelector(selectSortProducts)

	useEffect(() => {
		dispatch(setSortProducts(products))
		dispatch(setSort(sort))

		return () => {
			dispatch(resetSort())
		}
	}, [])

	const setSortLocal = (sort: SortEnum) => {
		dispatch(setSort(sort))
	}

	return (
		<div className={styles.wrapper}>
			{products && (
				<section className={cn(styles.section, styles._courses)}>
					<div className={cn(styles.title, styles.coursesTitle)}>
						<HTag tag='h1'>{page.title}</HTag>
						{products && (
							<Tag size='large' color='gray'>
								{products.length}
							</Tag>
						)}
						<Sort className={styles.sort} setSort={setSortLocal} sort={sort} />
					</div>
					<div>
						{sortProducts.map(p => (
							<div key={p._id}>{p.title}</div>
						))}
					</div>
				</section>
			)}
			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<section className={cn(styles.section, styles._hh)}>
					<div className={cn(styles.title, styles.hhTitle)}>
						<HTag tag='h2'>Вакансии - {page.category}</HTag>
						{products && (
							<Tag size='medium' color='red' href='https://hh.ru'>
								hh.ru
							</Tag>
						)}
					</div>
					<div className={styles.hh}>
						<HhData
							color='white'
							count={page.hh.count}
							juniorSalary={page.hh.juniorSalary}
							middleSalary={page.hh.middleSalary}
							seniorSalary={page.hh.seniorSalary}>
							Всего вакансии
						</HhData>
					</div>
				</section>
			)}
			{page.advantages && page.advantages.length > 0 && (
				<section className={cn(styles.section, styles._advantages)}>
					<div className={cn(styles.title, styles.advantagesTitle)}>
						<HTag tag='h2'>Преимущества</HTag>
					</div>
					<div className={styles.advantages}>
						<Advantages advantages={page.advantages} />
					</div>
				</section>
			)}
			{page.seoText && (
				<section className={cn(styles.section, styles._seo)}>
					<div className={cn(styles.title, styles.seoTitle)}>
						<HTag tag='h2'>SEO-текст</HTag>
					</div>
					<div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
				</section>
			)}
			{page.tags.length > 0 && (
				<section className={cn(styles.section, styles._tags)}>
					<div className={cn(styles.title, styles.advantagesTitle)}>
						<HTag tag='h2'>Получаемые навыки</HTag>
					</div>
					<div className={styles.tags}>
						{page.tags.map(tag => (
							<Tag color='primary' size='small' key={tag}>
								{tag}
							</Tag>
						))}
					</div>
				</section>
			)}
		</div>
	)
}
