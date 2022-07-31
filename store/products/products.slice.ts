import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortEnum } from '../../components/additional/Sort/Sort.props';
import { IProductModule } from '../../interfaces/product.interface';
import { IInitialState } from './products.interface';

const initialState: IInitialState = {
	sort: SortEnum.Rating,
	products: []
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProductModule[]>) => {
			state.products = action.payload;
		},
		sortProducts: (state, action: PayloadAction<SortEnum>) => {
			state.sort = action.payload;
			if (action.payload === SortEnum.Rating) state.products = state.products.sort((a, b) => (a.initialRating > b.initialRating ? -1 : 1));
			else state.products = state.products.sort((a, b) => (a.price > b.price ? 1 : -1));
		},
		resetProducts: state => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			state = initialState;
		}
	}
});

export const productsActions = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
