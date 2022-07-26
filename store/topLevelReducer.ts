import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TopLevelApi } from '../api/TopLevel.api'
// interfaces
import { IMenuItem } from '../interfaces/menu.interface'
import { TopLevelCategory } from '../interfaces/page.interface'
import { RootState } from './store'

// async thunks
export const fetchMenu = createAsyncThunk('topLevelSlice/fetchMenu', async (payload: { firstCategory: TopLevelCategory }) => {
	try {
		const menu = await TopLevelApi.getMenuItems(payload.firstCategory)
		return menu
	} catch (err: any) {
		return err.message
	}
})

export const fetchMenuByAlias = createAsyncThunk('topLevelSlice/fetchMenuItemByAlias', async (payload: { alias: string }) => {
	try {
		const menu = await TopLevelApi.getMenuItemByAlias(payload.alias)
		return menu
	} catch (err: any) {
		return err.message
	}
})

// initial state
interface IFetch {
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: 'string' | null
}

interface IInitialState {
	firstCategory: TopLevelCategory
	menu: IMenuItem[]
	fetchMenu: IFetch
	fetchMenuByAlias: IFetch
}

const initialState: IInitialState = {
	firstCategory: TopLevelCategory.Courses,
	menu: [] as IMenuItem[],
	fetchMenu: {
		status: 'idle',
		error: null
	},
	fetchMenuByAlias: {
		status: 'idle',
		error: null
	}
}

// slice
export const topLevelSlice = createSlice({
	name: 'topLevelPage',
	initialState,
	reducers: {
		setMenu: (state, action: PayloadAction<IMenuItem[]>) => {
			state.menu = action.payload
		},
		setFirstCategory: (state, action: PayloadAction<TopLevelCategory>) => {
			state.firstCategory = action.payload
		},
		resetTopLevelState: state => {
			state = initialState
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMenu.pending, (state, action) => {
				state.fetchMenu.status = 'loading'
			})
			.addCase(fetchMenu.fulfilled, (state, action) => {
				state.fetchMenu.status = 'succeeded'
				state.menu = action.payload
			})
			.addCase(fetchMenu.rejected, (state, action) => {
				state.fetchMenu.status = 'failed'
			})
			.addCase(fetchMenuByAlias.pending, (state, action) => {
				state.fetchMenuByAlias.status = 'loading'
			})
			.addCase(fetchMenuByAlias.fulfilled, (state, action) => {
				state.fetchMenuByAlias.status = 'succeeded'
			})
			.addCase(fetchMenuByAlias.rejected, (state, action) => {
				state.fetchMenuByAlias.status = 'failed'
			})
	}
})

// actions
export const { setFirstCategory, setMenu, resetTopLevelState } = topLevelSlice.actions

// selectors
export const selectFirstCategory = (state: RootState) => state.topLevelPage.firstCategory
export const selectMenu = (state: RootState) => state.topLevelPage.menu

export default topLevelSlice.reducer
