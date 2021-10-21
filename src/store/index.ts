import { combineReducers, configureStore } from '@reduxjs/toolkit'

import currentUserReducer, {
  createUserAndSignIn,
  destroyCurrentUser,
  selectCurrentUser,
  setCurrentUser,
  signOut,
} from './currentUserStore'
import uiReducer, { destroyError, selectError, setError } from './uiStore'

export type UserLike = {
  id: string
  name?: string
  email: string
}
export const isUserLike = (value: any): value is UserLike => {
  const hasRequireds = () => {
    return (
      value &&
      typeof value === 'object' &&
      typeof value.id === 'string' &&
      typeof value.email === 'string'
    )
  }

  const hasCorrectOptionals = () => {
    if (value.name && typeof value.name === 'string') {
      return true
    } else if (typeof value.name === 'undefined') {
      return true
    } else {
      return false
    }
  }

  return hasRequireds() && hasCorrectOptionals()
}

// Store & reducer exports
export const reducer = combineReducers({
  currentUser: currentUserReducer,
  ui: uiReducer,
})
export const store = configureStore({ reducer })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const appDispatch = store.dispatch

// Export directory
export {
  createUserAndSignIn,
  destroyCurrentUser,
  destroyError,
  selectCurrentUser,
  selectError,
  setCurrentUser,
  setError,
  signOut,
}
