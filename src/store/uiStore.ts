import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

const initialState = {
  error: null,
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
})

export const selectError = (state: RootState) => {
  return state.ui.error
}

export const { destroyError, reset, setError } = uiSlice.actions
export default uiSlice.reducer
