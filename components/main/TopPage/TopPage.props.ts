import {
	ITopPageModule,
	TopLevelCategory,
} from '../../../interfaces/page.interface';
import { IProductModule } from '../../../interfaces/product.interface';

export interface ITopPageProps {
  firstCategory: TopLevelCategory;
  page: ITopPageModule;
  products: IProductModule[];
}
