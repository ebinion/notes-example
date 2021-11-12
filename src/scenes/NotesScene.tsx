import { collection, onSnapshot, query, where } from 'firebase/firestore'
import {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  VFC,
} from 'react'
import { useSelector } from 'react-redux'

import { firestore } from '../services/firebase'
import {
  appDispatch,
  createNoteAndSetCurrent,
  destroyError,
  NoteLike,
  selectCurrentNote,
  selectCurrentUser,
  selectError,
  selectNotes,
  setCurrentNote,
  signOut,
} from '../store'

import { noteConverter } from '../utilities/helpers'
import { PlusIcon } from '../icons'
import {
  AppLayout,
  Avatar,
  Button,
  Flash,
  Header,
  IconedButton,
  Menu,
  Teaser,
  Toolbar,
  VStack,
} from '../views'
import CurrentNoteScene from './CurrentNoteScene'

const useNotesSubscription = (currentUserId: string) => {
  useEffect(() => {
    const notesQuery = query(
      collection(firestore, 'notes').withConverter(noteConverter),
      where('noteUserID', '==', currentUserId)
    )

    return onSnapshot(notesQuery, (notesSnapshot) => {
      let notes: NoteLike[] = []

      notesSnapshot.forEach((noteSnapshot) => {
        notes = [...notes, noteSnapshot.data()]
      })

      if (notes.length > 0) {
        appDispatch({
          type: 'notes/fetchNotes/fulfilled',
          payload: notes,
        })
        notes = []
      }
    })
  }, [currentUserId])
}

const NotesScene: VFC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const currentUser = useSelector(selectCurrentUser)
  const notes = useSelector(selectNotes)
  const note = useSelector(selectCurrentNote)
  const error = useSelector(selectError)
  const currentNoteID = note?.id

  useNotesSubscription(currentUser!.id)

  const handleNewNote: ReactEventHandler = (event) => {
    event.preventDefault()
    appDispatch(
      createNoteAndSetCurrent({
        userID: currentUser!.id,
        date: new Date().toISOString(),
      })
    )
    setIsNavOpen(false)
  }

  const handleSetCurrentNote = (note: NoteLike, event: SyntheticEvent) => {
    event.preventDefault()
    appDispatch(setCurrentNote({ noteID: note.id }))
    setIsNavOpen(false)
  }

  const handleDismissError = () => {
    appDispatch(destroyError())
  }

  const renderNav = () => {
    return (
      <VStack gap="m">
        <Header isSticky role="banner">
          <Toolbar
            leadingChildren={
              <Menu
                noBottomPad
                trigger={
                  <Avatar
                    name={
                      currentUser && currentUser.name
                        ? currentUser.name
                        : undefined
                    }
                  />
                }
                headerChildren={
                  <div className="text--s text--light">
                    {currentUser?.name && `Hi, ${currentUser.name}`}
                  </div>
                }
              >
                <Button
                  isAlignedLeading
                  isFullWidth
                  onClick={() => appDispatch(signOut())}
                  size="s"
                  type="secondary"
                >
                  Sign Out
                </Button>
              </Menu>
            }
            trailingChildren={
              <IconedButton onClick={handleNewNote} offset="trailing">
                <PlusIcon />
              </IconedButton>
            }
          >
            <h1 className="h4 text--light">Notes</h1>
          </Toolbar>
        </Header>

        <VStack gap="xs">
          {notes.map((note) => {
            return (
              <Teaser
                isActive={note.id === currentNoteID}
                title={note.title}
                date={note.lastModifiedDate}
                onClick={(event) => handleSetCurrentNote(note, event)}
                key={note.id}
              />
            )
          })}
        </VStack>
      </VStack>
    )
  }

  return (
    <>
      {error && <Flash message={error} closeHandler={handleDismissError} />}
      <AppLayout isNavOpen={isNavOpen} navChildren={renderNav()}>
        {currentNoteID && (
          <CurrentNoteScene handleNavOpen={setIsNavOpen} key={currentNoteID} />
        )}
      </AppLayout>
    </>
  )
}

export default NotesScene
