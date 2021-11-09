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
import { RootState, NoteLike, NoteFirestoreLike, appDispatch } from '.'
import {
  compareDateRecency,
  convertSnapshotToNote,
  shortID,
  sortNotes,
} from '../utilities/helpers'
import Queue from '../utilities/Queue'

let saveNotesTimeout: NodeJS.Timeout

export const notesQueue = new Queue<NoteLike>()
notesQueue.onEnqueue(() => {
  if (!notesQueue.isEmpty) {
    try {
      if (saveNotesTimeout) clearTimeout(saveNotesTimeout)
    } catch (error) {
      console.error(error)
    }
  }

  const postNote = () => {
    if (!notesQueue.isEmpty) {
      const note = notesQueue.dequeue()

      if (note) {
        appDispatch(updateNote({ ...note, sync: 'pending' }))

        const docRef = doc(firestore, `notes/${note.id}`)
        const savableNote = cloneNoteForFirestore(note)

        try {
          setDoc(docRef, savableNote).then(() => {
            appDispatch(updateNote({ ...note, sync: 'fulfilled' }))
          })
        } catch (error) {
          appDispatch(updateNote({ ...note, sync: 'unfulfilled' }))
          console.error(error)
        }
      }

      postNote()
    }
  }

  saveNotesTimeout = setTimeout(postNote, 5000)
})

const cloneNoteForFirestore = (note: NoteLike): NoteFirestoreLike => {
  const { lastModifiedDate, createdDate, title, body, noteUserID } = note

  return {
    lastModifiedDate,
    createdDate,
    title,
    body,
    noteUserID,
  }
}

const replaceNote = (note: NoteLike, notes: NoteLike[]): NoteLike[] => {
  const newNote: NoteLike = { ...note }

  return notes.map((note) => {
    if (note.id === newNote.id) {
      return newNote
    } else {
      return note
    }
  })
}

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
          collection(firestore, 'notes'),
          where('noteUserID', '==', currentUserId)
        )
        const notesSnapshot = await getDocs(notesQuery)
        notesSnapshot.forEach((noteSnapshot) => {
          notes.push(convertSnapshotToNote(noteSnapshot))
        })
        resolve(notes)
      } else {
        reject(new Error('Cannot fetch notes of logged out user'))
      }
    })
  }
)

const initialState: {
  all: NoteLike[]
  currentID: string | null
} = { all: [], currentID: null }

export const selectCurrentNote = (state: RootState) => {
  if (state.notes.currentID) return selectNote(state.notes.currentID, state)
}

export const selectNote = (noteID: string, state: RootState) => {
  return state.notes.all.find((note) => note.id === noteID)
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
        sync: 'unfulfilled',
      }

      state.currentID = noteID
      state.all.push(newNote)

      notesQueue.enqueue(newNote)

      return state
    },
    reset: () => {
      return initialState
    },
    setCurrentNote: (state, action: PayloadAction<{ noteID: string }>) => {
      return { ...state, currentID: action.payload.noteID }
    },
    /** Update Note in store only */
    updateNote: (state, action: PayloadAction<NoteLike>) => {
      console.log('Update note ran')
      const newNote: NoteLike = { ...action.payload, sync: 'unfulfilled' }
      return { ...state, all: replaceNote(newNote, state.all) }
    },
    /** Eagerly update Note in store and post to server */
    postNote: (state, action: PayloadAction<NoteLike>) => {
      const newNote: NoteLike = { ...action.payload, sync: 'unfulfilled' }

      notesQueue.enqueue(newNote)

      return { ...state, all: replaceNote(newNote, state.all) }
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
          ...state,
          all: sortNotes([...currentNotes, ...newNotes]),
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

      newState.currentID = newState.all[0] ? newState.all[0].id : null

      return newState
    })
  },
})

export const {
  createNoteAndSetCurrent,
  reset,
  setCurrentNote,
  postNote,
  updateNote,
} = notesSlice.actions
