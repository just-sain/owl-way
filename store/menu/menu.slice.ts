import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// interfaces
import { RootState } from '../store';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { IInitialState } from './menu.interface';
import { IMenuItem } from '../../interfaces/menu.interface';

const initialState: IInitialState = {
	firstCategory: TopLevelCategory.Courses,
	fetchMenu: {
		error: '',
		loading: 'idle'
	},
	menu: []
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		changeFirstCategory: (state, action: PayloadAction<TopLevelCategory>) => {
			state.firstCategory = action.payload;
		},
		setMenu: (state, action: PayloadAction<IMenuItem[]>) => {
			state.menu = action.payload;
		},
		resetMenuReducer: state => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			state = initialState;
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			state = action.payload.menu;
		}
	}
});

// selectors
export const selectFirstCategory = (state: RootState) => state.menu.firstCategory;
export const selectMenu = (state: RootState) => state.menu.menu;

export const menuActions = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
