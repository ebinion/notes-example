import { ReactNode, ReactEventHandler } from 'react'

import styles from './IconedButton.module.css'

const IconedButton = (props: {
  children: ReactNode
  onClick: ReactEventHandler
  offset?: 'leading' | 'trailing'
  isHiddenLg?: boolean
}) => {
  const { children, onClick, offset, isHiddenLg } = props

  const getClassNames = () => {
    let classNames = [styles.wrapper]

    if (offset && offset === 'leading')
      classNames.push(styles.wrapperOffsetLeading)
    if (offset && offset === 'trailing')
      classNames.push(styles.wrapperOffsetTrailing)
    if (isHiddenLg) classNames.push(styles.wrapperHiddenLg)

    return classNames.join(' ')
  }

  return (
    <button className={getClassNames()} onClick={onClick}>
      {children}
    </button>
  )
}

export default IconedButton
