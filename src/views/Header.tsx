import { AriaRole, FC, ReactNode } from 'react'

import styles from './Header.module.css'

interface HeaderProps {
  children: ReactNode
  isSticky?: boolean
  role?: AriaRole
}

const Header: FC<HeaderProps> = ({ children, isSticky, role }) => {
  return (
    <header
      role={role}
      className={`${styles.wrapper} ${isSticky && styles.wrapperIsSticky}`}
    >
      {children}
    </header>
  )
}

export default Header
