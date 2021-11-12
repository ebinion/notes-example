import { createSlice } from '@reduxjs/toolkit'
import { deleteNoteAndSetCurrent, fetchNotes, RootState, postNote } from '.'

const initialState = {
  error: null as string | null,
}

export const selectError = (state: RootState) => {
  return state.ui.error
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
    setError: (state, action) => {
      return { ...state, error: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postNote.pending, (state) => {
      return { ...state, error: null }
    })

    builder.addCase(postNote.rejected, (state) => {
      return {
        ...state,
        error:
          'Something went wrong with our servers. Please copy your note and refresh the page.',
      }
    })

    builder.addCase(deleteNoteAndSetCurrent.pending, (state) => {
      return { ...state, error: null }
    })

    builder.addCase(deleteNoteAndSetCurrent.rejected, (state) => {
      return {
        ...state,
        error: 'Sorry, we were unable to delete the note. Please try again.',
      }
    })

    builder.addCase(fetchNotes.pending, (state) => {
      return { ...state, error: null }
    })

    builder.addCase(fetchNotes.rejected, (state) => {
      return {
        ...state,
        error:
          'We were unable to retrieve your notes. Please refresh the page.',
      }
    })
  },
})

export const { destroyError, reset, setError } = uiSlice.actions
export default uiSlice.reducer
