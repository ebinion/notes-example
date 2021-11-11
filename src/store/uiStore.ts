import { createSlice } from '@reduxjs/toolkit'
import { RootState, postNote } from '.'

const initialState = {
  error: null as string | null,
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
    builder.addCase(postNote.fulfilled, (state) => {
      return { ...state, error: null }
    })

    builder.addCase(postNote.rejected, (state) => {
      return {
        ...state,
        error:
          'Something went wrong with our servers. Please copy your note and refresh the page.',
      }
    })
  },
})

export const selectError = (state: RootState) => {
  return state.ui.error
}

export const { destroyError, reset, setError } = uiSlice.actions
export default uiSlice.reducer
