import {FC, ReactNode} from 'react'

import styles from './Notice.module.css'
import { ReactComponent as ExclamationIcon } from '../icons/exclamation-circle-solid.svg'

interface NoticeProps {
  children: ReactNode
}

const Notice: FC<NoticeProps> = ({ children }) => {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon}>
        <ExclamationIcon />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Notice
