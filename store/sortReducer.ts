import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortEnum } from '../components/Sort/Sort.props'
// interfaces
import { IProductModule } from '../interfaces/product.interface'
import { RootState } from './store'

// initial state
interface IInitialState {
	sort: SortEnum
	products: IProductModule[]
}

const initialState: IInitialState = {
	sort: SortEnum.Rating,
	products: []
}

// slice
export const sortSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<SortEnum>) => {
			state.sort = action.payload
			if (action.payload === SortEnum.Rating) state.products.sort((a, b) => (a.initialRating > b.initialRating ? 1 : -1))
			else if (action.payload === SortEnum.Price) state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
			else throw new Error('invalid sort type')
		},
		setSortProducts: (state, action: PayloadAction<IProductModule[]>) => {
			state.products = action.payload
		},
		resetSort: state => {
			state = initialState
		}
	}
})

// actions
export const { setSort, setSortProducts, resetSort } = sortSlice.actions

// selectors
export const selectSort = (state: RootState) => state.sort.sort
export const selectSortProducts = (state: RootState) => state.sort.products

export default sortSlice.reducer
