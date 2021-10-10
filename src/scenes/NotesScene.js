import { useContext } from 'react'
import { signOut } from '@firebase/auth'

import { AppContext } from '../AppContext'

import AppLayout from '../views/AppLayout'
import Avatar from '../views/Avatar'
import { auth } from '../database'
import Button from '../views/Button'
import Header from '../views/Header'
import IconedButton from '../views/IconedButton'
import Menu from '../views/Menu'
import Note from '../views/Note'
import { ReactComponent as PlusIcon } from '../icons/plus-solid.svg'
import Teaser from '../views/Teaser'
import Toolbar from '../views/Toolbar'
import VStack from '../views/VStack'

const NotesScene = () => {
  const {
    currentUser,
    currentNoteID,
    handleSetCurrentNote,
    handleNewNote,
    isNavOpen,
    selectNotes,
    selectNote,
    toggleIsNavOpen,
    updateNote,
  } = useContext(AppContext)

  return (
    <AppLayout
      isNavOpen={isNavOpen}
      navChildren={
        <>
          <Header isSticky role="banner">
            <Toolbar
              leadingChildren={
                <Menu trigger={<Avatar name={currentUser.displayName} />}>
                  <VStack>
                    <div className="text--s text--light">
                      {currentUser.displayName &&
                        `Hi, ${currentUser.displayName}`}
                    </div>
                    <Button
                      isAlignedLeading
                      isFullWidth
                      onClick={() => signOut(auth)}
                      size="s"
                      type="secondary"
                    >
                      Sign Out
                    </Button>
                  </VStack>
                </Menu>
              }
              trailingChildren={
                <IconedButton icon={<PlusIcon />} onClick={handleNewNote} />
              }
            >
              <h1 className="h4 text--light">Notes</h1>
            </Toolbar>
          </Header>

          <VStack gap="xs" hasOutterGutter>
            {selectNotes().map(note => {
              return (
                <Teaser
                  isActive={note.id === currentNoteID}
                  title={note.title}
                  date={note.lastModifiedDate}
                  onClick={event => handleSetCurrentNote(note, event)}
                  key={note.id}
                />
              )
            })}
          </VStack>
        </>
      }
    >
      <Note
        data={selectNote()}
        updateNote={updateNote}
        toggleIsNavOpen={toggleIsNavOpen}
      />
    </AppLayout>
  )
}

export default NotesScene
