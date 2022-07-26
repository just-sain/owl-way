import { configureStore } from '@reduxjs/toolkit'
// reducers
import topLevelReducer from './topLevelReducer'
import aliasPageReducer from './aliasPageReducer'
import sortReducer from './sortReducer'

export const store = configureStore({
	reducer: {
		topLevelPage: topLevelReducer,
		aliasPage: aliasPageReducer,
		sort: sortReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
