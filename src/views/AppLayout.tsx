import { ReactNode, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import styles from './AppLayout.module.css'

const AppLayout = (props: {
  children: ReactNode
  isNavOpen: boolean
  navChildren: ReactNode
}) => {
  const { children, isNavOpen, navChildren } = props
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isNavOpen) {
      navRef.current?.focus()
    }
  }, [isNavOpen])

  const preventScroll = () => {
    return (
      <Helmet>
        <style type="text/css">
          {`
          @media (max-width: 599px){
            body {
              overflow: hidden;
            }
          }
          `}
        </style>
      </Helmet>
    )
  }

  return (
    <main className={styles.wrapper}>
      {isNavOpen && preventScroll()}
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
