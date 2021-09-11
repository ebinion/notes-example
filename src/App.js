import { useState } from 'react'

import IconedButton from './IconedButton'
import Toolbar from './Toolbar'
import { ReactComponent as PlusIcon } from './icons/plus-solid.svg'

import styles from './App.module.css'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderSidebar = () => {
    return (
      <div className={`${styles.nav} ${isMenuOpen && styles.navIsOpen}`}>
        <div className={styles.navToolbar}>
          <Toolbar trailingChildren={<IconedButton icon={<PlusIcon />} />} />
        </div>
        <div className={styles.navContent}>
          <h1>Notes</h1>
          <p>Sidebar</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {renderSidebar()}
      <div className={styles.content}>Content</div>
    </div>
  )
}

export default App
