// import { useState } from 'react'

import { AppContext } from '../AppContext'

import AppLayout from '../views/AppLayout'
import Avatar from '../views/Avatar'
import IconedButton from '../views/IconedButton'
import List from '../views/List'
import Note from '../views/Note'
import { ReactComponent as PlusIcon } from '../icons/plus-solid.svg'
import Teaser from '../views/Teaser'
import Toolbar from '../views/Toolbar'

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
              <header role="banner">
                <Toolbar
                  leadingChildren={<Avatar name="Placeholder" />}
                  trailingChildren={
                    <IconedButton icon={<PlusIcon />} onClick={handleNewNote} />
                  }
                >
                  <h1 className="h4 text--light">Notes</h1>
                </Toolbar>
              </header>

              <div className={styles.navContent}>
                <List>
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
                </List>
              </div>
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
