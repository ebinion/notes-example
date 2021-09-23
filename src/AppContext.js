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
      console.error(error)
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
        createdDate: new Date(),
        lastModifiedDate: new Date(),
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
