import { SortEnum } from '../../components/additional/Sort/Sort.props';
import { IProductModule } from '../../interfaces/product.interface';

export interface IInitialState {
  sort: SortEnum;
  products: IProductModule[];
}
