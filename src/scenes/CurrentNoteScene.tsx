import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  appDispatch,
  createNoteAndSetCurrent,
  deleteNoteAndSetCurrent,
  NoteLike,
  postNote,
  selectCurrentNote,
  selectCurrentUser,
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

const handleNewNote = () => {
  const currentUserID = selectCurrentUser(store.getState())?.id

  if (currentUserID) {
    appDispatch(
      createNoteAndSetCurrent({
        userID: currentUserID,
        date: new Date().toISOString(),
      })
    )
  }
}

const useAutoPostNote = (note?: NoteLike) => {
  const [isNoteSaved, setIsNoteSaved] = useState(true)

  useEffect(() => {
    const delayedPostNote = debounce(async () => {
      if (note) {
        await appDispatch(postNote(note))
        setIsNoteSaved(true)
      }
    }, 3000)

    setIsNoteSaved(false)
    delayedPostNote()

    return delayedPostNote.cancel
  }, [note])

  return isNoteSaved
}

const CurrentNoteScene = (props: {
  handleNavOpen: (isOpen: boolean) => void
}) => {
  const { handleNavOpen } = props

  const note = useSelector(selectCurrentNote)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const isNoteSaved = useAutoPostNote(note)

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

              {!isNoteSaved && (
                <div className="text--light text--s">...saving</div>
              )}
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
      {!note && (
        <div>
          <p className="text--center">
            It looks like you don't have any saved notes, yet.
          </p>
          <p className="text--center">
            <Button onClick={handleNewNote} type="secondary">
              Create Note
            </Button>
          </p>
        </div>
      )}
    </VStack>
  )
}

export default CurrentNoteScene
