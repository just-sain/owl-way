import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IReviewFormProps } from './ReviewForm.props'
// components
import { Button, Input, Paragraph, Rating, Textarea } from '../../additional'
// styles
import cn from 'classnames'
import styles from './ReviewForm.module.scss'
import CloseIcon from './close.svg'

interface IFormValues {
	name: string
	title: string
	text: string
}

export const ReviewForm = ({ className, productId, ...props }: IReviewFormProps) => {
	const [rating, setRating] = useState<number>(0)
	const { handleSubmit, control } = useForm<IFormValues>({ mode: 'onSubmit' })

	const onSubmit: SubmitHandler<IFormValues> = ({ name, title, text }) => {
		console.log(name, title, text)
	}

	return (
		<>
			<form {...props} className={cn(className, styles.form)} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='name'
					control={control}
					render={({ field: { ref, ...field } }) => <Input {...field} inputRef={ref} placeholder='Имя' type='text' />}
				/>
				<Controller
					name='title'
					control={control}
					render={({ field: { ref, ...field } }) => (
						<Input {...field} className={styles.title} inputRef={ref} placeholder='Заголовок отзыва' type='text' />
					)}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Rating rating={rating} setRating={setRating} isEditable />
				</div>
				<Controller
					name='text'
					control={control}
					render={({ field: { ref, ...field } }) => (
						<Textarea {...field} className={styles.description} inputRef={ref} placeholder='Текст отзыва' />
					)}
				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<Paragraph size='small'>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</Paragraph>
				</div>
			</form>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв был отправлен</div>
				<div className={styles.successDescription}>Спасибо, ваш отзыв будет опубликован после проверки.</div>
				<CloseIcon className={styles.close} />
			</div>
		</>
	)
}
