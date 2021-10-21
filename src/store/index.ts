import { combineReducers, configureStore } from '@reduxjs/toolkit'

import currentUserReducer from './currentUserStore'

export const reducer = combineReducers({
  currentUser: currentUserReducer,
})

export const store = configureStore({ reducer })

// Infer Root state and dispatch from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
