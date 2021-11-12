import { ReactNode, ReactEventHandler } from 'react'

import styles from './Button.module.css'

type SizeLike = 's' | 'm'
type TypeLike = 'danger' | 'disabled' | 'primary' | 'secondary' | 'warning'

const Button = (props: {
  children: ReactNode
  isFullWidth?: boolean
  isAlignedLeading?: boolean
  onClick?: ReactEventHandler
  size?: SizeLike
  type?: TypeLike
  [k: string]: any
}) => {
  const {
    children,
    isAlignedLeading,
    isFullWidth,
    onClick,
    size,
    type,
    ...rest
  } = props

  const getClassNames = (size: SizeLike, type: TypeLike) => {
    let classList = [styles.button]

    switch (size) {
      case 's':
        classList.push(styles.buttonS)
        break
      default:
        classList.push(styles.buttonM)
        break
    }

    switch (type) {
      case 'danger':
        classList.push(styles.buttonDanger)
        break
      case 'disabled':
        classList.push(styles.buttonDisabled)
        break
      case 'secondary':
        classList.push(styles.buttonSecondary)
        break
      case 'warning':
        classList.push(styles.buttonWarning)
        break
      default:
        classList.push(styles.buttonPrimary)
    }

    if (isFullWidth) classList.push(styles.buttonFullWidth)

    if (isAlignedLeading) classList.push(styles.buttonAlignLeading)

    return classList.join(' ')
  }

  return (
    <button
      className={size && type && getClassNames(size, type)}
      disabled={type === 'disabled'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  size: 'm',
  type: 'primary',
}

export default Button
