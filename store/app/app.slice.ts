import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IInitialState, ThemeModeType } from './app.interface';

const initialState: IInitialState = {
	themeMode: 'light'
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		changeThemeMode: (state, action: PayloadAction<ThemeModeType>) => {
			state.themeMode = action.payload;
			localStorage.setItem('themeMode', action.payload);
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			state = action.payload.app;
		}
	}
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
