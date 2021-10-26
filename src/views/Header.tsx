import { AriaRole, ReactNode } from 'react'

import styles from './Header.module.css'

const Header = (props: {
  children: ReactNode
  isSticky?: boolean
  role?: AriaRole
}) => {
  const { children, isSticky, role } = props
  return (
    <header role={role} className={isSticky ? styles.wrapperIsSticky : ''}>
      {children}
    </header>
  )
}

export default Header
