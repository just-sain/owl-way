import { ForwardedRef, forwardRef, KeyboardEvent, useRef, useState } from 'react';
import { IProductProps } from './Product.props';
import { declOfNum, priceRule } from '../../../helpers/helpers';
// components
import { Button, Card, Divider, HTag, Rating, Tag } from '../../additional';
import { Review } from '../Review/Review';
import { ReviewForm } from '../../forms';
// styles
import cn from 'classnames';
import styles from './Product.module.scss';
import { motion } from 'framer-motion';

// quality={70}
// layout='fill'
// objectFit='contain'
// objectPosition='center

export const Product = motion(
	forwardRef(({ className, product }: IProductProps, ref: ForwardedRef<HTMLDivElement>) => {
		const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
		const reviewRef = useRef<HTMLDivElement>(null);

		const reviewVariant = {
			visible: { height: 'auto', opacity: 1, padding: '3rem 2rem 2rem' },
			hidden: { height: 0, opacity: 0, padding: 0 }
		};

		const scrollToReview = () => {
			setIsReviewOpened(true);
			reviewRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
			reviewRef.current?.focus();
		};

		const scrollToReviewOnKeyDown = (key: KeyboardEvent) => {
			if (key.code === 'Enter' || key.code === 'Space') {
				key.preventDefault();
				scrollToReview();
			}
		};

		return (
			<Card className={cn(className, styles.card)} ref={ref} isRounded color='blue'>
				<Card className={styles.product} color='white'>
					<div className={styles.logo}>
						<img src={!product.image.includes('http') ? process.env.NEXT_PUBLIC_DOMAIN + product.image : product.image} alt={product.title} />
					</div>
					<HTag className={styles.title} tag='h3'>
						{product.title}
					</HTag>
					<div className={styles.price}>
						<span>
							<span className='visualHidden'>цена</span>
							{priceRule(product.price)}
						</span>
						{product.oldPrice && (
							<Tag className={styles.oldPrice} color='green' size='small'>
								<span className='visualHidden'>скидка</span>
								{priceRule(product.price - product.oldPrice)}
							</Tag>
						)}
					</div>
					<div className={styles.credit}>
						{priceRule(product.credit)}/<span className={styles.month}>мес</span>
					</div>
					<div className={styles.rating}>
						<span className='visualHidden'>{`рейтинг ${product.reviewAvg ?? product.initialRating}`}</span>
						<Rating rating={product.reviewAvg ?? product.initialRating} />
					</div>
					<div className={styles.categories}>
						{product.categories.map(category => (
							<Tag className={styles.category} key={category} color='ghost' size='small'>
								{category}
							</Tag>
						))}
					</div>
					<div className={styles.priceTitle} aria-hidden>
						цена
					</div>
					<div className={styles.creditTitle} aria-hidden>
						кредит
					</div>
					<div className={styles.ratingTitle}>
						<a href='#review' onClick={scrollToReview} onKeyDown={scrollToReviewOnKeyDown}>
							{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
						</a>
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
						<Button
							aria-expanded={isReviewOpened}
							appearance='ghost'
							arrow={isReviewOpened ? 'down' : 'right'}
							onClick={() => setIsReviewOpened(!isReviewOpened)}>
							Читать отзывы
						</Button>
					</div>
				</Card>
				<Card
					ref={reviewRef}
					tabIndex={isReviewOpened ? 0 : -1}
					layout
					variants={reviewVariant}
					initial='hidden'
					animate={isReviewOpened ? 'visible' : 'hidden'}
					color='transparent'
					className={styles.reviews}>
					{product.reviews.map(r => (
						<Review key={r._id} review={r} />
					))}
					<ReviewForm isOpened={isReviewOpened} productId={product._id} />
				</Card>
			</Card>
		);
	})
);
