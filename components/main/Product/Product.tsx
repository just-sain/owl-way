import { useState } from 'react'
import Image from 'next/image'
import { declOfNum, priceRule } from '../../../helpers/helpers'
import { IProductProps } from './Product.props'
import { Button, Card, Divider, HTag, Rating, Tag } from '../../additional'
// styles
import cn from 'classnames'
import styles from './Product.module.scss'
import { Review } from '../Review/Review'
import { ReviewForm } from '../../forms'

export const Product = ({ className, product }: IProductProps) => {
	const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false)

	return (
		<Card className={cn(className, styles.card)} isRounded color='blue'>
			<Card className={styles.product} color='white'>
				<div className={styles.logo}>
					<Image
						quality={70}
						src={!product.image.includes('http') ? process.env.NEXT_PUBLIC_DOMAIN + product.image : product.image}
						alt={product.title}
						layout='fill'
						objectFit='contain'
						objectPosition='center'
					/>
				</div>
				<HTag className={styles.title} tag='h3'>
					{product.title}
				</HTag>
				<div className={styles.price}>
					{priceRule(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color='green' size='small'>
							{priceRule(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRule(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.categories}>
					{product.categories.map(category => (
						<Tag className={styles.category} key={category} color='ghost' size='small'>
							{category}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.ratingTitle}>
					{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.features}>
					{product.characteristics &&
						product.characteristics.map(c => (
							<div className={styles.feature} key={c.name}>
								<span className={styles.featureName}>{c.name}</span>
								<span className={styles.featureDots}></span>
								<span className={styles.featureValue}>{c.value}</span>
							</div>
						))}
				</div>
				<div className={styles.characteristics}>
					{product.advantages && product.advantages.length > 0 && (
						<div className={cn(styles.characteristic, styles._advantages)}>
							<div className={styles.characteristicTitle}>Преимущества</div>
							<div className={styles.characteristicText}>{product.advantages}</div>
						</div>
					)}
					{product.disAdvantages && product.disAdvantages.length > 0 && (
						<div className={cn(styles.characteristic, styles._disadvantages)}>
							<div className={styles.characteristicTitle}>Недостатки</div>
							<div className={styles.characteristicText}>{product.disAdvantages}</div>
						</div>
					)}
				</div>
				<Divider className={cn(styles.hr, styles._hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary' href={product.link}>
						Узнать подробнее
					</Button>
					<Button appearance='ghost' arrow={isReviewOpen ? 'down' : 'right'} onClick={() => setIsReviewOpen(!isReviewOpen)}>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card color='transparent' className={cn(styles.reviews, { [styles._open]: isReviewOpen })}>
				{product.reviews.map(r => (
					<Review key={r._id} review={r} />
				))}
				<Divider />
				<ReviewForm productId={product._id} />
			</Card>
		</Card>
	)
}
