import { configureStore } from '@reduxjs/toolkit'

import warHammerModalsReducer from 'store/warHammerModals'

export const store = configureStore({
	reducer: {
		warHammerModals: warHammerModalsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch