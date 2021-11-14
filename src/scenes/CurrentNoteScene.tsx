import { debounce } from 'lodash'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  appDispatch,
  createNoteAndSetCurrent,
  deleteNoteAndSetCurrent,
  NoteLike,
  postNote,
  selectCurrentNote,
  selectCurrentUser,
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
  Header,
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

  if (value.title) newNote.title = value.title
  if (value.body) newNote.body = JSON.stringify(value.body)

  newNote.lastModifiedDate = convertDateToString(new Date())

  appDispatch(updateNote(newNote))
}

const useAutoPostNote = (note?: NoteLike) => {
  const isFirstRun = useRef(true)

  useEffect(() => {
    const delayedPostNote = !isFirstRun.current
      ? debounce(async () => {
          if (note) {
            await appDispatch(postNote(note))
          }
        }, 3000)
      : null

    if (delayedPostNote) {
      appDispatch(setIsSaving(true))
      delayedPostNote()
    } else {
      isFirstRun.current = false
    }

    return () => {
      delayedPostNote && delayedPostNote.cancel()
    }
  }, [note])
}

const CurrentNoteScene = (props: {
  handleNavOpen: (isOpen: boolean) => void
  key: string
}) => {
  const { handleNavOpen } = props

  const isNoteSaving = useSelector(selectIsSaving)
  const note = useSelector(selectCurrentNote)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useAutoPostNote(note)

  useEffect(() => {
    const unloadHandler = (event: BeforeUnloadEvent) => {
      if (selectIsSaving(store.getState())) {
        event.preventDefault()

        return (event.returnValue = 'Changes to your note may not be saved.')
      }
    }

    window.addEventListener('beforeunload', unloadHandler)

    return () => window.removeEventListener('beforeunload', unloadHandler)
  }, [])

  return (
    <VStack gap="m">
      <Header isSticky>
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
                            type={isNoteSaving ? 'disabled' : 'danger'}
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
            )
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

export default CurrentNoteScene
