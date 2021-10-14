import { FC, ReactNode, useRef, useEffect } from 'react'

import styles from './AppLayout.module.css'

interface AppLayoutProps {
  children: ReactNode
  isNavOpen: boolean
  navChildren: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({
  children,
  isNavOpen,
  navChildren,
}) => {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isNavOpen) {
      navRef.current?.focus()
    }
  }, [isNavOpen])

  return (
    <main className={styles.wrapper}>
      <nav
        className={`${styles.nav} ${isNavOpen && styles.navIsOpen}`}
        ref={navRef}
        tabIndex={-1}
      >
        {navChildren}
      </nav>
      <section className={styles.content}>{children}</section>
    </main>
  )
}

export default AppLayout
