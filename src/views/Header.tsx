import { AriaRole, ReactNode } from 'react'

import styles from './Header.module.css'

/**
 * Used at the top of note & nav to create consistent spacing.
 */
const Header = (props: {
  children: ReactNode
  /** Affixes the header to the top of the screen on scroll */
  isSticky?: boolean
  role?: AriaRole
}) => {
  const { children, isSticky, role } = props
  return (
    <header
      role={role}
      className={
        isSticky
          ? `${styles.wrapper} ${styles.wrapperIsSticky}`
          : styles.wrapper
      }
    >
      {children}
    </header>
  )
}

export default Header
