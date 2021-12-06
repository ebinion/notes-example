import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  appDispatch,
  deleteNoteAndSetCurrent,
  NoteLike,
  postNote,
  selectCurrentNote,
  selectIsSaving,
  setIsSaving,
  store,
  updateNote,
} from '../store'

import { convertDateToString, getDateTimeString } from '../utilities/helpers'
import { BarsIcon, EllipsisIcon } from '../icons'
import { Descendant } from 'slate'
import {
  Button,
  ButtonGroup,
  Editor,
  Container,
  IconedButton,
  Menu,
  NoteTitle,
  Spinner,
  TimeAgo,
  Toolbar,
  VStack,
} from '../views'

const handleNoteUpdate = (
  value: { title?: string; body?: Descendant[] },
  note: NoteLike
) => {
  const newNote = { ...note }

  if (typeof value.title == 'string') newNote.title = value.title
  if (value.body) newNote.body = JSON.stringify(value.body)

  newNote.lastModifiedDate = convertDateToString(new Date())

  appDispatch(updateNote(newNote))
}

const delayedPostNote = debounce((note: NoteLike) => {
  if (note) {
    appDispatch(postNote(note))
  }
}, 1000)

const CurrentNoteScene = (props: {
  handleNavOpen: (isOpen: boolean) => void
}) => {
  const { handleNavOpen } = props
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const isNoteSaving = useSelector(selectIsSaving)
  const note = useSelector(selectCurrentNote)

  useEffect(() => {
    if (note) {
      !selectIsSaving(store.getState()) && appDispatch(setIsSaving(true))
      delayedPostNote(note)
    }
  }, [note])

  useEffect(() => {
    const unloadHandler = (event: BeforeUnloadEvent) => {
      if (selectIsSaving(store.getState())) {
        event.preventDefault()

        return (event.returnValue = 'Changes to your note may not be saved.')
      }
    }

    window.addEventListener('beforeunload', unloadHandler)

    return () => {
      window.removeEventListener('beforeunload', unloadHandler)
      delayedPostNote.flush()
    }
  }, [])

  return (
    <VStack gap="m">
      <Container as="header" pad="top" sticky="top">
        <Container pad="horizontal">
          <Toolbar
            leadingChildren={
              <>
                <IconedButton
                  onClick={() => handleNavOpen(true)}
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

                {isNoteSaving && <Spinner />}
              </>
            }
            trailingChildren={
              note && (
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
                              kind={isNoteSaving ? 'disabled' : 'danger'}
                              onClick={() => {
                                note &&
                                  appDispatch(deleteNoteAndSetCurrent(note.id))
                              }}
                              size="s"
                              title={isNoteSaving ? '' : undefined}
                            >
                              Delete
                            </Button>
                            <Button
                              kind="secondary"
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
                          {note &&
                            getDateTimeString(new Date(note.createdDate))}
                        </p>
                      )}
                    </>
                  }
                  noBottomPad={showDeleteConfirmation ? false : true}
                  trigger={
                    <IconedButton offset="trailing">
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
                        kind="warning"
                      >
                        Delete Note
                      </Button>
                    </VStack>
                  )}
                </Menu>
              )
            }
          />
        </Container>
      </Container>
      {note && (
        <VStack gap="s">
          <Container pad="horizontal">
            <NoteTitle
              onChange={(value) => {
                handleNoteUpdate({ title: value }, note)
              }}
              placeholder="Untitled Note"
              value={note.title}
            />
          </Container>
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

export default CurrentNoteScene
