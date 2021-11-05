import {
  FC,
  useState,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import { Descendant } from 'slate'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

import { firestore } from '../services/firebase'
import {
  appDispatch,
  createNoteAndSetCurrent,
  NoteLike,
  selectCurrentNote,
  selectCurrentUser,
  selectNotes,
  setCurrentNote,
  signOut,
  updateNote,
  store,
} from '../store'

import {
  convertDateToString,
  convertSnapshotToNote,
} from '../utilities/helpers'
import { BarsIcon, PlusIcon } from '../icons'

import {
  AppLayout,
  Avatar,
  Button,
  Editor,
  Header,
  IconedButton,
  Menu,
  NoteTitle,
  Teaser,
  TimeAgo,
  Toolbar,
  VStack,
} from '../views'

const useNotesSubscription = (currentUserId: string) => {
  useEffect(() => {
    const notesQuery = query(
      collection(firestore, 'notes'),
      where('noteUserID', '==', currentUserId)
    )

    return onSnapshot(notesQuery, (notesSnapshot) => {
      let notes: NoteLike[] = []

      notesSnapshot.forEach((noteSnapshot) => {
        notes = [...notes, convertSnapshotToNote(noteSnapshot)]
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

const handleNoteUpdate = (
  value: { title?: string; body?: Descendant[] },
  note: NoteLike
) => {
  const newNote = { ...note }

  if (value.title) newNote.title = value.title
  if (value.body) newNote.body = JSON.stringify(value.body)

  newNote.lastModifiedDate = convertDateToString(new Date())

  appDispatch(updateNote(newNote))
}

const NotesScene: FC = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const notes = useSelector(selectNotes)
  const [note, setNote] = useState(useSelector(selectCurrentNote))
  const currentNoteID = note?.id

  useNotesSubscription(currentUser!.id)

  useEffect(() => {
    return store.subscribe(() => {
      setNote(selectCurrentNote(store.getState()))
    })
  }, [note])

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

  const renderNav = () => {
    return (
      <VStack gap="m">
        <Header isSticky role="banner">
          <Toolbar
            leadingChildren={
              <Menu
                trigger={
                  <Avatar
                    name={
                      currentUser && currentUser.name
                        ? currentUser.name
                        : undefined
                    }
                  />
                }
              >
                <VStack>
                  <div className="text--s text--light">
                    {currentUser?.name && `Hi, ${currentUser.name}`}
                  </div>
                  <Button
                    isAlignedLeading
                    isFullWidth
                    onClick={() => appDispatch(signOut())}
                    size="s"
                    type="secondary"
                  >
                    Sign Out
                  </Button>
                </VStack>
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

  const renderNote = () => {
    return (
      <VStack gap="m">
        <Header isSticky>
          <Toolbar
            leadingChildren={
              <>
                <IconedButton
                  onClick={() => setIsNavOpen(true)}
                  isHiddenLg
                  offset="leading"
                >
                  <BarsIcon />
                </IconedButton>

                {note && (
                  <div className="text--light text--s">
                    Last edited <TimeAgo date={note.lastModifiedDate} />
                  </div>
                )}
              </>
            }
          />
        </Header>
        {note && (
          <VStack gap="s">
            <NoteTitle
              onChange={(value) => handleNoteUpdate({ title: value }, note)}
              placeholder="Untitled Note"
              value={note.title}
            />
            <Editor
              key={note.id}
              onChange={(value) => {
                handleNoteUpdate({ body: value }, note)
              }}
              value={note.body ? JSON.parse(note.body) : null}
            />
          </VStack>
        )}
      </VStack>
    )
  }

  return (
    <AppLayout isNavOpen={isNavOpen} navChildren={renderNav()}>
      {renderNote()}
    </AppLayout>
  )
}

export default NotesScene
