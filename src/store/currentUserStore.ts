import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from '@firebase/auth'

import { isUserLike, RootState, setError, UserLike } from '.'
import { auth } from '../database'
import { getAuthErrorMessage } from '../helpers'

export const createUserAndSignIn = createAsyncThunk(
  'currentUser/post',
  (
    payload: {
      email: string
      password: string
      name: string
    },
    thunkAPI
  ) => {
    const trimmedName = payload.name.trim()

    return new Promise<UserLike>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          updateProfile(userCredential.user, { displayName: trimmedName })
            .then(() => {
              resolve({
                id: userCredential.user.uid,
                email: userCredential.user.email!,
                name: trimmedName,
              })
            })
            .catch((error) => reject(error))
        })
        .catch((error) => {
          thunkAPI.dispatch(setError(getAuthErrorMessage(error)))
          reject(error)
        })
    })
  }
)

export const selectCurrentUser = (state: RootState) => state.currentUser

export const signOut = createAsyncThunk('currentUser/delete', () => {
  return new Promise<null>((resolve, reject) => {
    firebaseSignOut(auth)
      .then(() => resolve(null))
      .catch((error) => reject(error))
  })
})

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null as UserLike | null,
  reducers: {
    destroyCurrentUser: () => {
      return null
    },
    setCurrentUser: (state, action: PayloadAction<UserLike>) => {
      if (isUserLike(action.payload)) {
        return action.payload
      } else {
        return state
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAndSignIn.fulfilled, (state, action) => {
      return action.payload
    })

    builder.addCase(signOut.fulfilled, () => {
      return null
    })
  },
})

export const { destroyCurrentUser, setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
