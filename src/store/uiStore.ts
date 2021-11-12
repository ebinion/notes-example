import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  deleteNoteAndSetCurrent,
  fetchNotes,
  RootState,
  postNote,
  signOut,
} from '.'

const initialState = {
  error: null as string | null,
  isSaving: false,
}

export const selectError = (state: RootState) => {
  return state.ui.error
}

export const selectIsSaving = (state: RootState) => {
  return state.ui.isSaving
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    destroyError: (state) => {
      return { ...state, error: null }
    },
    reset: () => {
      return initialState
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, error: action.payload }
    },
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      return { ...state, isSaving: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postNote.rejected, (state) => {
      return {
        ...state,
        error:
          'Something went wrong with our servers. Please copy your note and refresh the page.',
      }
    })

    builder.addCase(postNote.fulfilled, (state) => {
      return { ...state, isSaving: false }
    })

    builder.addCase(deleteNoteAndSetCurrent.rejected, (state) => {
      return {
        ...state,
        error: 'Sorry, we were unable to delete the note. Please try again.',
      }
    })

    builder.addCase(fetchNotes.rejected, (state) => {
      return {
        ...state,
        error:
          'We were unable to retrieve your notes. Please refresh the page.',
      }
    })

    builder.addCase(signOut.rejected, (state, action) => {
      const error = action.error.message
        ? action.error.message
        : 'There was an issue signing out. Please try again'
      return { ...state, error }
    })
  },
})

export const { destroyError, reset, setError, setIsSaving } = uiSlice.actions
export default uiSlice.reducer
