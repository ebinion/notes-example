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
      {({ isNavOpen, toggleIsNavOpen }) => (
        <main className={styles.wrapper}>
          <nav className={`${styles.nav} ${isNavOpen && styles.navIsOpen}`}>
            <div className={styles.navToolbar}>
              <Toolbar
                trailingChildren={
                  <IconedButton icon={<PlusIcon />} onClick={toggleIsNavOpen} />
                }
              />
            </div>
            <div className={styles.navContent}>
              <header role="banner">
                <h1>Notes</h1>
              </header>
              <p>Sidebar</p>
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
