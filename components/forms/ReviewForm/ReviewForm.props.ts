import { DetailedHTMLProps, FormHTMLAttributes } from 'react'

export interface IReviewFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	productId: string
}
