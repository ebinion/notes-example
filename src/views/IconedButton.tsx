import { FC, ReactNode, ReactEventHandler } from 'react'

import styles from './IconedButton.module.css'

interface IconedLinkProps {
  children: ReactNode
  onClick: ReactEventHandler
}

const IconedLink: FC<IconedLinkProps> = ({ children, ...props }) => {
  return (
    <button className={styles.wrapper} {...props}>
      {children}
    </button>
  )
}

export default IconedLink
