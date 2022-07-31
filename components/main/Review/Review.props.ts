import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReviewModule } from '../../../interfaces/product.interface';

export interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: IReviewModule;
}
