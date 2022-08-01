import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
// slices and reducers
import { appReducer, appSlice } from './app/app.slice';
import { menuReducer, menuSlice } from './menu/menu.slice';
import { productsReducer, productsSlice } from './products/products.slice';

// some default interfaces for statement
export interface IAsyncThunkState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

// old redux toolkit
// export const store = configureStore({
// 	reducer: {
// 		[appSlice.name]: appReducer,
// 		[productsSlice.name]: productsReducer
// 	}
// })

// export type RootState = ReturnType<typeof store.getState>

// new way of connect redux toolkit with next-redux-wrapper
const makeStore = () =>
	configureStore({
		reducer: {
			[appSlice.name]: appReducer,
			[productsSlice.name]: productsReducer,
			[menuSlice.name]: menuReducer,
		}
	});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
