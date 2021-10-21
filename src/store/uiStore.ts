import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    error: null,
  },
  reducers: {
    destroyError: (state) => {
      return { ...state, error: null }
    },
    setError: (state, action) => {
      return { ...state, error: action.payload }
    },
  },
})

export const selectError = (state: RootState) => {
  return state.ui.error
}

export const { destroyError, setError } = uiSlice.actions
export default uiSlice.reducer
