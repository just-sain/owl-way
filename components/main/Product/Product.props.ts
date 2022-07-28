import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { IProductModule } from '../../../interfaces/product.interface'

export interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product: IProductModule
}
