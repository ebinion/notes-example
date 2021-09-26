// import { useState } from 'react'

import IconedButton from './IconedButton'
import Toolbar from './Toolbar'
import { ReactComponent as PlusIcon } from './icons/plus-solid.svg'

import { AppContext } from './AppContext'
import List from './List'
import Note from './Note'
import Teaser from './Teaser'
import styles from './App.module.css'

const App = () => {
  return (
    <AppContext.Consumer>
      {({
        currentNoteID,
        handleSetCurrentNote,
        handleNewNote,
        isNavOpen,
        selectNotes,
      }) => (
        <main className={styles.wrapper}>
          <nav className={`${styles.nav} ${isNavOpen && styles.navIsOpen}`}>
            <div className={styles.navToolbar}>
              <Toolbar
                trailingChildren={
                  <IconedButton icon={<PlusIcon />} onClick={handleNewNote} />
                }
              />
            </div>

            <header role="banner" className={styles.navHeader}>
              <h1>Notes</h1>
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
          </nav>
          <section className={styles.content}>
            <Note />
          </section>
        </main>
      )}
    </AppContext.Consumer>
  )
}

export default App
