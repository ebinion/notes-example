import { ReactNode } from 'react'

import styles from './ButtonGroup.module.css'

const ButtonGroup = (props: { children: ReactNode }) => {
  return <div className={styles.wrapper}>{props.children}</div>
}

export default ButtonGroup
