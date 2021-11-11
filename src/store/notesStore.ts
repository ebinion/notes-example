import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { firestore } from '../services/firebase'
import { RootState, NoteLike } from '.'
import {
  compareDateRecency,
  noteConverter,
  shortID,
  sortNotes,
} from '../utilities/helpers'

const initialState: {
  all: NoteLike[]
  currentID: string | null
} = { all: [], currentID: null }

export const deleteNoteAndSetCurrent = createAsyncThunk(
  'notes/destroyNote',
  (noteID: string, thunkAPI) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await deleteDoc(doc(firestore, `notes/${noteID}`))
      } catch (error) {
        console.error(error)
        reject(error)
      }
      resolve(noteID)
    })
  }
)

export const fetchNotes = createAsyncThunk(
  'notes/fetch',
  (currentUserId: string, thunkAPI) => {
    return new Promise<NoteLike[]>(async (resolve, reject) => {
      if (currentUserId) {
        const notes: NoteLike[] = []
        const notesQuery = query(
          collection(firestore, 'notes').withConverter(noteConverter),
          where('noteUserID', '==', currentUserId)
        )
        const notesSnapshot = await getDocs(notesQuery)
        notesSnapshot.forEach((noteSnapshot) => {
          notes.push(noteSnapshot.data())
        })
        resolve(notes)
      } else {
        reject(new Error('Cannot fetch notes of logged out user'))
      }
    })
  }
)

export const postNote = createAsyncThunk(
  'notes/postNote',
  async (note: NoteLike) => {
    return new Promise<NoteLike>(async (resolve, reject) => {
      const docRef = doc(firestore, `notes/${note.id}`).withConverter(
        noteConverter
      )

      try {
        await setDoc(docRef, note)
        resolve(note)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }
)

export const selectCurrentNote = (state: RootState) => {
  return state.notes.all.find((note) => note.id === state.notes.currentID)
}

export const selectCurrentNoteID = (state: RootState) => {
  return state.notes.currentID
}

export const selectNotes = (state: RootState) => {
  return sortNotes([...state.notes.all])
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
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
    reset: () => {
      return initialState
    },
    setCurrentNote: (state, action: PayloadAction<{ noteID: string }>) => {
      const newState = { ...state }

      newState.currentID = action.payload.noteID

      return newState
    },
    updateNote: (state, action: PayloadAction<NoteLike>) => {
      const newNote = { ...action.payload }

      const newNotes = state.all.map((note) => {
        if (note.id === action.payload.id) {
          return newNote
        } else {
          return note
        }
      })

      return { all: newNotes, currentID: state.currentID }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const sortedNotes = sortNotes([...action.payload!])

      if (state.all.length === 0 && sortedNotes.length > 0) {
        return {
          all: sortedNotes,
          currentID: sortedNotes[0].id,
        }
      } else if (sortedNotes.length > 0) {
        const currentNotes = [...state.all]

        // Retains most current note by removing older version
        // of incoming note from state
        const newNotes = action.payload.filter((newNote) => {
          // Is there an existing note in state?
          const currentNoteIndex = currentNotes.findIndex((currentNote) => {
            return currentNote.id === newNote.id
          })

          if (
            currentNoteIndex !== -1 &&
            compareDateRecency(
              currentNotes[currentNoteIndex].lastModifiedDate,
              newNote.lastModifiedDate
            ) === 1
          ) {
            // Existing note in state is newer
            return false
          } else if (currentNoteIndex !== -1) {
            // Existing note in state is older or same
            currentNotes.splice(currentNoteIndex, 1)
          }

          return true
        })

        return {
          all: sortNotes([...currentNotes, ...newNotes]),
          currentID: state.currentID,
        }
      }

      return state
    })

    builder.addCase(deleteNoteAndSetCurrent.fulfilled, (state, action) => {
      const newState = {
        all: sortNotes([...state.all]),
        currentID: state.currentID,
      }

      const noteIndex = newState.all.findIndex(
        (note) => note.id === action.payload
      )
      if (noteIndex !== -1) {
        newState.all.splice(noteIndex, 1)
      }

      newState.currentID = newState.all.length > 0 ? newState.all[0].id : null

      return newState
    })
  },
})

export const { createNoteAndSetCurrent, reset, setCurrentNote, updateNote } =
  notesSlice.actions
