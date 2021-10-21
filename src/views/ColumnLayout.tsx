import { ReactNode } from 'react'

import styles from './ColumnLayout.module.css'

const ColumnLayout = (props: { children: ReactNode }) => {
  return <main className={styles.column}>{props.children}</main>
}

export default ColumnLayout
