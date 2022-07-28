import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { IProductModule, IReviewModule } from '../../../interfaces/product.interface'

export interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: IReviewModule
}
