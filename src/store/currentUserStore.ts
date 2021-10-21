import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from '@firebase/auth'

import { auth } from '../database'
import { RootState } from '.'

export type UserLike = {
  id: string
  name?: string
  email: string
}

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
        .catch((error) => reject(error))
    })
  }
)

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

export const selectCurrentUser = (state: RootState) => state.currentUser

export const signOut = createAsyncThunk('currentUser/delete', () => {
  return new Promise<null>((resolve, reject) => {
    firebaseSignOut(auth)
      .then(() => resolve(null))
      .catch((error) => reject(error))
  })
})

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null as UserLike | null,
  reducers: {
    set: (state, action: PayloadAction<UserLike>) => {
      if (isUserLike(action.payload)) {
        return action.payload
      } else {
        return state
      }
    },
    destroy: () => {
      return null
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

export const { destroy, set } = currentUserSlice.actions
export default currentUserSlice.reducer
