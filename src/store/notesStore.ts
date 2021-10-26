import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, NoteLike } from '.'
import { shortID } from '../helpers'

export const selectCurrentNote = (state: RootState) => {
  return state.notes.all.find((note) => note.id === state.notes.currentID)
}

export const selectCurrentNoteID = (state: RootState) => {
  return state.notes.currentID
}

export const selectNotes = (state: RootState) => {
  return [...state.notes.all].sort((a, b) => {
    const sinceA = new Date(a.lastModifiedDate).toISOString()
    const sinceB = new Date(b.lastModifiedDate).toISOString()

    if (sinceA > sinceB) {
      return -1
    } else if (sinceA < sinceB) {
      return 1
    } else {
      return 0
    }
  })
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState: { all: [], currentID: null } as {
    all: NoteLike[]
    currentID: string | null
  },
  reducers: {
    createNoteAndSetCurrent: (
      state,
      action: PayloadAction<{ userID: string; date: string }>
    ) => {
      const noteID = shortID()

      const newNote: NoteLike = {
        lastModifiedDate: action.payload.date,
        createdDate: action.payload.date,
        id: noteID,
        title: '',
        body: '',
        noteUserID: action.payload.userID,
      }

      state.currentID = noteID
      state.all.push(newNote)

      return state
    },
    destroyNote: (state, action: PayloadAction<NoteLike>) => {
      const newState = { ...state }
      const noteIndex = newState.all.findIndex(
        (note) => note.id === action.payload.id
      )
      if (noteIndex !== -1) {
        newState.all.splice(noteIndex, 1)
      }
      return newState
    },
    setCurrentNote: (state, action: PayloadAction<{ noteID: string }>) => {
      const newState = { ...state }

      newState.currentID = action.payload.noteID

      return newState
    },
    updateNote: (state, action: PayloadAction<NoteLike>) => {
      const newNotes = state.all.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...action.payload,
          }
        } else {
          return note
        }
      })

      return { all: newNotes, currentID: state.currentID }
    },
  },
})

export const {
  createNoteAndSetCurrent,
  destroyNote,
  setCurrentNote,
  updateNote,
} = notesSlice.actions
