// import { useState } from 'react'

import { AppContext } from '../AppContext'

import AppLayout from '../views/AppLayout'
import Avatar from '../views/Avatar'
import Header from '../views/Header'
import IconedButton from '../views/IconedButton'
import Note from '../views/Note'
import { ReactComponent as PlusIcon } from '../icons/plus-solid.svg'
import Teaser from '../views/Teaser'
import Toolbar from '../views/Toolbar'
import VStack from '../views/VStack'

import styles from './NotesScene.module.css'

const NotesScene = () => {
  return (
    <AppContext.Consumer>
      {({
        currentNoteID,
        handleSetCurrentNote,
        handleNewNote,
        isNavOpen,
        selectNotes,
      }) => (
        <AppLayout
          isNavOpen={isNavOpen}
          navChildren={
            <>
              <Header isSticky role="banner">
                <Toolbar
                  leadingChildren={<Avatar name="Placeholder" />}
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
          <Note />
        </AppLayout>
      )}
    </AppContext.Consumer>
  )
}

export default NotesScene
