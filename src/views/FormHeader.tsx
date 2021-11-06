import { AriaRole, ReactNode } from 'react'

import styles from './FormHeader.module.css'

const FormHeader = (props: { children: ReactNode; role?: AriaRole }) => {
  const { children, role } = props

  return (
    <header role={role} className={styles.wrapper}>
      {children}
    </header>
  )
}

export default FormHeader
