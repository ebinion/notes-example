import { combineReducers, configureStore } from '@reduxjs/toolkit'

import currentUserReducer, {
  createUserAndSignIn,
  destroyCurrentUser,
  selectCurrentUser,
  setCurrentUser,
  signIn,
  signOut,
} from './currentUserStore'
import {
  createNoteAndSetCurrent,
  deleteNoteAndSetCurrent,
  fetchNotes,
  notesSlice,
  reset as resetNotes,
  selectCurrentNote,
  selectCurrentNoteID,
  selectNotes,
  setCurrentNote,
  postNote,
} from './notesStore'
import uiReducer, {
  destroyError,
  reset as resetUI,
  selectError,
  setError,
} from './uiStore'

export type NoteLike = {
  lastModifiedDate: string
  id: string
  createdDate: string
  title: string
  body: string
  noteUserID: string
  sync: 'pending' | 'unfulfilled' | 'fulfilled'
}

export type NoteFirestoreLike = {
  lastModifiedDate: string
  createdDate: string
  title: string
  body: string
  noteUserID: string
}

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
  notes: notesSlice.reducer,
  ui: uiReducer,
})
export const store = configureStore({ reducer })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const appDispatch = store.dispatch

// Export directory
export {
  createNoteAndSetCurrent,
  createUserAndSignIn,
  destroyCurrentUser,
  destroyError,
  deleteNoteAndSetCurrent,
  fetchNotes,
  resetNotes,
  resetUI,
  selectCurrentNote,
  selectCurrentNoteID,
  selectCurrentUser,
  selectError,
  selectNotes,
  setCurrentNote,
  setCurrentUser,
  setError,
  signIn,
  signOut,
  postNote,
}
