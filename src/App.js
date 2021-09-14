// import { useState } from 'react'

import IconedButton from './IconedButton'
import Toolbar from './Toolbar'
import { ReactComponent as PlusIcon } from './icons/plus-solid.svg'

import { AppContext } from './AppContext'
import Note from './Note'
import styles from './App.module.css'

const App = () => {
  return (
    <AppContext.Consumer>
      {({ handleSetCurrentNote, handleNewNote, isNavOpen, selectNotes }) => (
        <main className={styles.wrapper}>
          <nav className={`${styles.nav} ${isNavOpen && styles.navIsOpen}`}>
            <div className={styles.navToolbar}>
              <Toolbar
                trailingChildren={
                  <IconedButton icon={<PlusIcon />} onClick={handleNewNote} />
                }
              />
            </div>
            <div className={styles.navContent}>
              <header role="banner">
                <h1>Notes</h1>
              </header>
              <ol>
                {selectNotes().map(note => {
                  return (
                    <li key={note.id}>
                      <button
                        onClick={event => handleSetCurrentNote(note, event)}
                      >
                        <h4>{note.title}</h4>
                        <div>{note.lastModifiedDate.toString()}</div>
                      </button>
                    </li>
                  )
                })}
              </ol>
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
