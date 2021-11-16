import { ReactNode, ReactEventHandler } from 'react'

import styles from './Button.module.css'

type SizeLike = 's' | 'm'
type KindLike = 'danger' | 'disabled' | 'primary' | 'secondary' | 'warning'

const Button = (props: {
  children: ReactNode
  isFullWidth?: boolean
  isAlignedLeading?: boolean
  kind?: KindLike
  onClick?: ReactEventHandler
  size?: SizeLike
  [k: string]: any
}) => {
  const {
    children,
    isAlignedLeading,
    isFullWidth,
    kind,
    onClick,
    size,
    ...rest
  } = props

  const getClassNames = (size: SizeLike, kind: KindLike) => {
    let classList = [styles.button]

    switch (size) {
      case 's':
        classList.push(styles.buttonS)
        break
      default:
        classList.push(styles.buttonM)
        break
    }

    switch (kind) {
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
      className={size && kind && getClassNames(size, kind)}
      disabled={kind === 'disabled'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  size: 'm',
  kind: 'primary',
}

export default Button
