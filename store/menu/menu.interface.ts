import { IMenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { IAsyncThunkState } from '../store';

export interface IInitialState {
  firstCategory: TopLevelCategory;
  fetchMenu: IAsyncThunkState;
  menu: IMenuItem[];
}
