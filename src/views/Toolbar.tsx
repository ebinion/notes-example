import { ReactNode } from 'react'

import styles from './Toolbar.module.css'

const Toolbar = (props: {
  children?: ReactNode
  leadingChildren?: ReactNode
  trailingChildren?: ReactNode
}) => {
  const { children, leadingChildren, trailingChildren } = props

  return (
    <div className={styles.wrapper}>
      <div className={styles.leading}>{leadingChildren}</div>
      <div className={styles.center}>{children}</div>
      <div className={styles.trailing}>{trailingChildren}</div>
    </div>
  )
}

Toolbar.defaultProps = {}

export default Toolbar
