import { FC, ReactNode } from 'react'

import styles from './Toolbar.module.css'

interface ToolbarProps {
  children?: ReactNode
  leadingChildren?: ReactNode
  trailingChildren?: ReactNode
}

const Toolbar: FC<ToolbarProps> = ({
  children,
  leadingChildren,
  trailingChildren,
}) => {
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
