import {
  Context,
  FC,
  ReactElement,
  ReactEventHandler,
  ReactNode,
  SyntheticEvent,
} from 'react'
import { useEffect, useState, createContext } from 'react'
import ShortUniqueID from 'short-unique-id'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
} from '@firebase/auth'

import { auth } from './database'
import { getAuthErrorMessage } from './helpers'

/**
 * TYPES
 */

type AppContextType = {
  createUser: CreateUserType
  currentNoteID: CurrentNoteIdType
  currentUser: UserType
  errorMessage: ErrorMessageType
  handleNewNote: HandleNewNoteType
  handleSetCurrentNote: HandleSetCurrentNoteType
  isNavOpen: IsNavOpenType
  notes: NotesType
  selectNote: SelectNoteType
  selectNotes: SelectNotesType
  setCurrentUser: SetCurrentUser
  setErrorMessage: SetErrorMessageType
  toggleIsNavOpen: ToggleIsNavOpenType
  updateNote: UpdateNoteType
}

interface AppContextProviderProps {
  children: ReactNode
}

type CreateUserType = (payload: {
  email: string
  name: string
  password: string
}) => void

type CurrentNoteIdType = string | null

type ErrorMessageType = string | null

type HandleNewNoteType = ReactEventHandler

type HandleSetCurrentNoteType = (note: NoteType, event: SyntheticEvent) => void

type IsNavOpenType = boolean

export type NoteType = {
  lastModifiedDate: Date
  id: string
  createdDate: Date
  title: string
  body: string
}

type NotesType = NoteType[]

type SelectNoteType = (noteID?: string) => NoteType | undefined

type SelectNotesType = () => NoteType[]

type SetCurrentUser = (user: User | null) => void

type SetErrorMessageType = (message: string | null) => void

type ToggleIsNavOpenType = () => void

type UserType = {
  uid: string
  displayName?: string | null
  email?: string | null
} | null

type UpdateNoteType = (note: NoteType) => void

/**
 * Declaration
 */

const uid = new ShortUniqueID({ length: 16 })

let AppContext: Context<AppContextType>
// const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider: FC<AppContextProviderProps> = (
  props
): ReactElement => {
  const generateEmptyNote = () => {
    return {
      id: uid(),
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      title: '',
      body: '',
    }
  }

  const firstNote = generateEmptyNote()

  const [notes, setNotes] = useState<NoteType[]>([firstNote])
  const [currentNoteID, setCurrentNoteID] = useState(firstNote.id)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [currentUser, _setCurrentUser] = useState<UserType | null>(null)

  // User
  const createUser: CreateUserType = ({ email, name, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
          if (auth.currentUser) setCurrentUser(auth.currentUser)
        })
      })
      .catch((error) => {
        setErrorMessage(getAuthErrorMessage(error.code))
      })
  }

  const setCurrentUser: SetCurrentUser = (user) => {
    if (user) {
      const newUser: UserType = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }
      _setCurrentUser({ ...newUser })
    } else {
      _setCurrentUser(null)
    }
  }

  // Managing Notes
  const createNewNote = (): NoteType => {
    const newNote = generateEmptyNote()

    const newNotes = notes.concat([newNote])
    setNotes(newNotes)

    return newNote
  }

  const handleNewNote: ReactEventHandler = (event) => {
    event.preventDefault()
    setIsNavOpen(false)

    const newNote = createNewNote()
    setCurrentNote(newNote)
  }

  const handleSetCurrentNote: HandleSetCurrentNoteType = (note, event) => {
    event.preventDefault()
    setCurrentNote(note)
    setIsNavOpen(false)
  }

  const generateNoteBody = (body: string, note: NoteType): NoteType => {
    return Object.assign({}, note, { body })
  }

  const generateNoteTitle = (title: string, note: NoteType): NoteType => {
    return Object.assign({}, note, { title })
  }

  const findNoteIndex = (noteID: string, notes: NoteType[]): number => {
    const index = notes.findIndex((note) => {
      return note.id === noteID
    })

    if (index < 0) {
      throw new Error('Note was not found in Notes.')
    } else {
      return index
    }
  }

  const selectNote: SelectNoteType = (noteID = currentNoteID) => {
    try {
      return notes[findNoteIndex(noteID, notes)]
    } catch (error: any) {
      setErrorMessage(error)
    }
  }

  const selectNotes: SelectNotesType = () => {
    let newNotes: NoteType[] = [...notes]

    return newNotes.sort((firstNote: NoteType, secondNote: NoteType) => {
      const firstNoteTime = firstNote.lastModifiedDate.getTime()
      const secondNoteTime = secondNote.lastModifiedDate.getTime()

      if (firstNoteTime < secondNoteTime) {
        return 1
      } else if (firstNoteTime > secondNoteTime) {
        return -1
      } else {
        return 0
      }
    })
  }

  const setCurrentNote = (note: NoteType): void => {
    setCurrentNoteID(note.id)
  }

  const updateNote: UpdateNoteType = (note) => {
    try {
      let newNote = Object.assign({}, note, {
        lastModifiedDate: new Date(),
      })
      newNote = generateNoteTitle(note.title, newNote)
      newNote = generateNoteBody(note.body, newNote)

      const newNotes = [...notes]
      newNotes[findNoteIndex(newNote.id, newNotes)] = newNote

      setNotes(newNotes)
    } catch (error: any) {
      setErrorMessage(error)
    }
  }

  // Managing UI State
  const toggleIsNavOpen: ToggleIsNavOpenType = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    if (notes.length === 0) {
      const newNote = {
        id: uid(),
        createdDate: new Date(),
        lastModifiedDate: new Date(),
        title: 'Empty Note Title',
        body: 'Empty Note Body',
      }

      setNotes([newNote])

      setCurrentNoteID(newNote.id)
    }
  }, [notes.length])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const contextObject: AppContextType = {
    createUser,
    currentNoteID,
    currentUser,
    errorMessage,
    handleNewNote,
    handleSetCurrentNote,
    isNavOpen,
    notes,
    selectNote,
    selectNotes,
    setCurrentUser,
    setErrorMessage,
    toggleIsNavOpen,
    updateNote,
  }

  AppContext = createContext(contextObject)

  return (
    <AppContext.Provider value={contextObject}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
