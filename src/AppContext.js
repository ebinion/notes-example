import PropTypes from 'prop-types'
import { useEffect, useState, createContext } from 'react'
import ShortUniqueID from 'short-unique-id'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from '@firebase/auth'

import { auth } from './database'
import { getAuthErrorMessage } from './helpers'

const uid = new ShortUniqueID({ length: 16 })

const AppContext = createContext({
  errorMessage: '',
  setErrorMessage: message => {},
  currentUser: {},
  createUser: ({ email, name, password }) => {},
  setCurrentUser: () => {},
  notes: [],
  currentNoteID: '',
  isNavOpen: false,
  handleSetCurrentNote: note => {},
  handleNewNote: () => {},
  selectNote: () => {},
  selectNotes: () => {},
  toggleIsNavOpen: () => {},
  updateNote: note => {},
})

const AppContextProvider = props => {
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
  const [notes, setNotes] = useState([firstNote])
  const [currentNoteID, setCurrentNoteID] = useState(firstNote.id)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [currentUser, _setCurrentUser] = useState(null)

  // User
  const createUser = ({ email, name, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
          setCurrentUser(auth.currentUser)
        })
      })
      .catch(error => {
        setErrorMessage(getAuthErrorMessage(error.code))
      })
  }

  const setCurrentUser = user => {
    if (user) {
      _setCurrentUser(
        Object.assign(
          {},
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          }
        )
      )
    } else {
      _setCurrentUser(null)
    }
  }

  // Managing Notes
  const createNewNote = () => {
    const newNote = generateEmptyNote()

    const newNotes = notes.concat([newNote])
    setNotes(newNotes)

    return newNote
  }

  const handleNewNote = event => {
    event.preventDefault()
    setIsNavOpen(false)

    const newNote = createNewNote()
    setCurrentNote(newNote)
  }

  const handleSetCurrentNote = (note, event) => {
    event.preventDefault()
    setCurrentNote(note)
    setIsNavOpen(false)
  }

  const generateNoteBody = (body = '', oldNote = {}) => {
    if (typeof body !== 'string') {
      throw new Error(
        "We‘ve encountered an error. Note body must be a 'string'."
      )
    } else {
      return Object.assign({}, oldNote, { body })
    }
  }

  const generateNoteTitle = (title = '', oldNote = {}) => {
    if (typeof title !== 'string') {
      throw new Error(
        "We‘ve encountered an error. Note title must be a 'string'."
      )
    } else {
      const newTitle = title
      return Object.assign({}, oldNote, { title: newTitle })
    }
  }

  const findNoteIndex = (noteID, notes) => {
    const index = notes.findIndex(note => {
      return note.id === noteID
    })

    if (index < 0) {
      throw new Error('Note was not found in Notes.')
    } else {
      return index
    }
  }

  const selectNote = (noteID = currentNoteID) => {
    try {
      return notes[findNoteIndex(noteID, notes)]
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const selectNotes = () => {
    return [].concat(notes).sort((firstNote, secondNote) => {
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

  const setCurrentNote = note => {
    setCurrentNoteID(note.id)
  }

  const updateNote = note => {
    try {
      let newNote = Object.assign({}, note, {
        lastModifiedDate: new Date(),
      })
      newNote = generateNoteTitle(note.title, newNote)
      newNote = generateNoteBody(note.body, newNote)

      const newNotes = [...notes]
      newNotes[findNoteIndex(newNote.id, newNotes)] = newNote

      setNotes(newNotes)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  // Managing UI State
  const toggleIsNavOpen = () => {
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
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <AppContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        createUser,
        currentUser,
        setCurrentUser,
        notes,
        currentNoteID,
        isNavOpen,
        handleSetCurrentNote,
        handleNewNote,
        selectNote,
        selectNotes,
        toggleIsNavOpen,
        updateNote,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}

export { AppContext, AppContextProvider }
