import React, { useRef, useEffect } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './AppLayout.module.css'

const AppLayout = props => {
  const navRef = useRef()

  useEffect(() => {
    if (props.isNavOpen) {
      navRef.current.focus()
    }
  }, [props.isNavOpen])

  return (
    <main className={styles.wrapper}>
      <nav
        className={`${styles.nav} ${props.isNavOpen && styles.navIsOpen}`}
        ref={navRef}
        tabIndex="-1"
      >
        {props.navChildren}
      </nav>
      <section className={styles.content}>{props.children}</section>
    </main>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
  isNavOpen: PropTypes.bool,
  navChildren: PropTypes.node,
}

AppLayout.defaultProps = {}

export default AppLayout
