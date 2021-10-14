import { FC, ReactNode } from 'react'

import styles from './ColumnLayout.module.css'

interface ColumnLayoutProps {
  children: ReactNode
}

const ColumnLayout: FC<ColumnLayoutProps> = ({ children }) => {
  return <main className={styles.column}>{children}</main>
}

export default ColumnLayout
