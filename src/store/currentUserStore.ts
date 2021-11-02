import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from '@firebase/auth'

import { destroyError, isUserLike, RootState, setError, UserLike } from '.'
import { auth } from '../services/firebase'
import { getAuthErrorMessage } from '../utilities/helpers'

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

    thunkAPI.dispatch(destroyError())

    return new Promise<UserLike>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          updateProfile(userCredential.user, { displayName: trimmedName })
            .catch((error: AuthError) => reject(error))
            .then(() => {
              // Set currentUser on state
              resolve({
                id: userCredential.user.uid,
                email: userCredential.user.email!,
                name: trimmedName,
              })
            })
        })
        .catch((error: AuthError) => {
          thunkAPI.dispatch(setError(getAuthErrorMessage(error)))
          reject(error)
        })
    })
  }
)

export const selectCurrentUser = (state: RootState) => state.currentUser

export const signIn = createAsyncThunk(
  'currentUser/get',
  (payload: { email: string; password: string }, thunkAPI) => {
    thunkAPI.dispatch(destroyError())

    return new Promise<UserLike>((resolve, reject) => {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user
          resolve({
            id: user.uid,
            email: user.email!,
            name: user.displayName!,
          })
        })
        .catch((error: AuthError) => {
          thunkAPI.dispatch(setError(getAuthErrorMessage(error)))
          reject(error)
        })
    })
  }
)

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
      return { ...action.payload }
    })

    builder.addCase(createUserAndSignIn.rejected, () => {
      return null
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
      return { ...action.payload }
    })

    builder.addCase(signIn.rejected, () => {
      return null
    })

    builder.addCase(signOut.fulfilled, () => {
      return null
    })

    builder.addCase(signOut.rejected, () => {
      return null
    })
  },
})

export const { destroyCurrentUser, setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
