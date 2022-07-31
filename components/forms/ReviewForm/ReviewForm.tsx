import { KeyboardEvent, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../../helpers/api';
// interfaces
import { IReviewFormProps } from './ReviewForm.props';
import { IReviewFormValues, IReviewSentResponse } from './ReviewForm.interface';
// components
import { Button, Paragraph, Rating } from '../../additional';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { motion } from 'framer-motion';
// styles
import cn from 'classnames';
import styles from './ReviewForm.module.scss';
import CloseIcon from './close.svg';

export const ReviewForm = ({ className, productId, isOpened, ...props }: IReviewFormProps) => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [reject, setReject] = useState<string | undefined>(undefined);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		clearErrors
	} = useForm<IReviewFormValues>({ mode: 'onSubmit', defaultValues: {} });

	const onSubmit: SubmitHandler<IReviewFormValues> = async formData => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setReject('Что-то пошло не так');
			}
		} catch (e) {
			if (typeof e === 'string') {
				setReject(e);
			} else if (e instanceof Error) {
				setReject(e.message);
			}
		}
	};

	const closeAnswerFrag = (key: KeyboardEvent, type: 'success' | 'reject') => {
		if (key.code === 'Enter' || key.code === 'Space') {
			key.preventDefault();
			if (type === 'success') setIsSuccess(false);
			else setReject(undefined);
		}
	};

	return (
		<form {...props} className={cn(className, styles.wrapper)} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Заполните имя' }
					})}
					error={errors.name}
					aria-invalid={errors.name ? true : false}
					tabIndex={isOpened ? 0 : -1}
					placeholder='Имя'
					type='text'
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок отзыва ' }
					})}
					error={errors.title}
					aria-invalid={errors.title ? true : false}
					tabIndex={isOpened ? 0 : -1}
					className={styles.title}
					placeholder='Заголовок отзыва'
					type='text'
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Поставьте оценку' } }}
						render={({ field }) => (
							<Rating
								tabIndex={isOpened ? 0 : -1}
								ref={field.ref}
								error={errors.rating}
								rating={field.value}
								setRating={field.onChange}
								isEditable
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: { value: true, message: 'Заполните текст отзыва ' }
					})}
					error={errors.description}
					aria-invalid={errors.description ? true : false}
					tabIndex={isOpened ? 0 : -1}
					className={styles.description}
					placeholder='Текст отзыва'
				/>
				<div className={styles.submit}>
					<Button onClick={() => clearErrors()} tabIndex={isOpened ? 0 : -1} appearance='primary'>
						Отправить
					</Button>
					<Paragraph size='small'>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</Paragraph>
				</div>
			</div>
			<motion.div
				role={'alert'}
				className={cn(styles.answer, {
					[styles._reject]: reject,
					[styles._success]: isSuccess
				})}
				variants={answerVariant}
				animate={isSuccess || reject ? 'visible' : 'hidden'}
				initial={'hidden'}>
				{isSuccess && (
					<>
						<div className={styles.answerTitle}>Ваш отзыв был отправлен</div>
						<div className={styles.answerDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
						<button
							aria-label='Закрыть оповещение'
							onClick={() => setIsSuccess(false)}
							tabIndex={isSuccess ? 0 : -1}
							onKeyDown={(key: KeyboardEvent) => closeAnswerFrag(key, 'success')}
							className={styles.answerClose}>
							<CloseIcon />
						</button>
					</>
				)}
				{reject && (
					<>
						<div className={styles.answerTitle}>Ошибка</div>
						<div className={styles.answerDescription}>Что-то пошло не так, попробуйте обновить страницу</div>
						<button
							aria-label='Закрыть оповещение'
							tabIndex={reject ? 0 : -1}
							onClick={() => setReject(undefined)}
							onKeyDown={(key: KeyboardEvent) => closeAnswerFrag(key, 'reject')}
							className={styles.answerClose}>
							<CloseIcon />
						</button>
					</>
				)}
			</motion.div>
		</form>
	);
};

const answerVariant = {
	visible: {
		opacity: 1,
		marginTop: '2rem',
		padding: '2rem'
	},
	hidden: {
		opacity: 0,
		marginTop: 0,
		padding: 0
	}
};
