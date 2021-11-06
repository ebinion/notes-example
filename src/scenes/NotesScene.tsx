import {
  VFC,
  useState,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import { Descendant } from 'slate'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

import { getDateTimeString } from '../utilities/helpers'
import { firestore } from '../services/firebase'
import {
  appDispatch,
  createNoteAndSetCurrent,
  deleteNoteAndSetCurrent,
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
import { BarsIcon, EllipsisIcon, PlusIcon } from '../icons'
import {
  AppLayout,
  Avatar,
  Button,
  ButtonGroup,
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

const NotesScene: VFC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const currentUser = useSelector(selectCurrentUser)
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
                  <BarsIcon title="Menu" />
                </IconedButton>

                {note && (
                  <div className="text--light text--s">
                    Last edited <TimeAgo date={note.lastModifiedDate} />
                  </div>
                )}
              </>
            }
            trailingChildren={
              <Menu
                anchor="trailing"
                closeCallback={() => setShowDeleteConfirmation(false)}
                headerChildren={
                  <>
                    {showDeleteConfirmation && (
                      <VStack>
                        <div>
                          <h4 className="text--noMargin">Are you sure?</h4>
                          <p className="text--noMargin text--s">
                            Your note will be permantly deleted.
                          </p>
                        </div>
                        <ButtonGroup>
                          <Button
                            type="danger"
                            onClick={() => {
                              note &&
                                appDispatch(deleteNoteAndSetCurrent(note.id))
                            }}
                            size="s"
                          >
                            Delete
                          </Button>
                          <Button
                            type="secondary"
                            onClick={() => setShowDeleteConfirmation(false)}
                            size="s"
                          >
                            Cancel
                          </Button>
                        </ButtonGroup>
                      </VStack>
                    )}
                    {!showDeleteConfirmation && (
                      <p className="text--s text--light">
                        Created{' '}
                        {note && getDateTimeString(new Date(note.createdDate))}
                      </p>
                    )}
                  </>
                }
                noBottomPad={showDeleteConfirmation ? false : true}
                trigger={
                  <IconedButton>
                    <EllipsisIcon title="Options" />
                  </IconedButton>
                }
              >
                {!showDeleteConfirmation && (
                  <VStack gap="s">
                    <Button
                      isAlignedLeading
                      isFullWidth
                      onClick={(event) => {
                        event.preventDefault()
                        setShowDeleteConfirmation(true)
                      }}
                      size="s"
                      type="warning"
                    >
                      Delete Note
                    </Button>
                  </VStack>
                )}
              </Menu>
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
