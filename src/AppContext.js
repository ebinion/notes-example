import PropTypes from 'prop-types'
import { useEffect, useState, createContext } from 'react'
import ShortUniqueID from 'short-unique-id'

const uid = new ShortUniqueID({ length: 16 })

const AppContext = createContext({
  notes: [],
  currentNoteID: '',
  isNavOpen: false,
  toggleIsNavOpen: () => {},
})

const getNowUTCString = () => new Date().toUTCString()

const AppContextProvider = props => {
  const firstNote = {
    id: uid(),
    createdDate: getNowUTCString(),
    lastModifiedDate: getNowUTCString(),
    title: 'Empty Note Title',
    body: 'Empty Note Body',
  }
  const [notes, setNotes] = useState([firstNote])
  const [currentNoteID, setCurrentNoteID] = useState(firstNote.id)
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Managing Notes
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
      return Object.assign({}, oldNote, { title })
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
      console.error(error)
    }
  }

  const updateNote = note => {
    try {
      let newNote = Object.assign({}, note, {
        lastModifiedDate: getNowUTCString(),
      })
      newNote = generateNoteTitle(note.title, newNote)
      newNote = generateNoteBody(note.body, newNote)

      const newNotes = [...notes]
      newNotes[findNoteIndex(newNote.id, newNotes)] = newNote

      setNotes(newNotes)

      console.log(newNotes)
    } catch (error) {
      console.error(error)
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
        createdDate: getNowUTCString(),
        lastModifiedDate: getNowUTCString(),
        title: 'Empty Note Title',
        body: 'Empty Note Body',
      }

      setNotes([newNote])

      setCurrentNoteID(newNote.id)
    }
  }, [notes.length])

  return (
    <AppContext.Provider
      value={{
        notes,
        currentNoteID,
        isNavOpen,
        selectNote,
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
