import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TopLevelApi } from '../api/TopLevel.api'
// interfaces
import { ITopPageModule, TopLevelCategory } from '../interfaces/page.interface'
import { IProductModule } from '../interfaces/product.interface'
import { RootState } from './store'

// async thunks
export const fetchProductMenu = createAsyncThunk('aliasPageSlice/fetchProductMenu', async (payload: { category: string; limit?: number }) => {
	try {
		const menu = await TopLevelApi.getProductModule(payload.category, payload.limit)
		return menu
	} catch (err: any) {
		return err.message
	}
})

// initial state
interface IInitialState {
	products: IProductModule[]
	page: ITopPageModule | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: 'string' | null
}

const initialState: IInitialState = {
	products: [],
	page: null,
	status: 'idle',
	error: null
}

// slice
export const aliasPageSlice = createSlice({
	name: 'aliasPage',
	initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<IProductModule[]>) => {
			state.products = action.payload
		},
		setPage: (state, action: PayloadAction<ITopPageModule>) => {
			state.page = action.payload
		},
		resetAliasPageState: state => {
			state = initialState
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProductMenu.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchProductMenu.fulfilled, (state, action) => {
				state.status = 'succeeded'
			})
			.addCase(fetchProductMenu.rejected, (state, action) => {
				state.status = 'failed'
			})
	}
})

// actions
export const { setProducts, setPage, resetAliasPageState } = aliasPageSlice.actions

// selectors
export const selectProducts = (state: RootState) => state.aliasPage.products
export const selectPage = (state: RootState) => state.aliasPage.page

export default aliasPageSlice.reducer
