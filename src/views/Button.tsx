import {FC, ReactNode, ReactEventHandler} from 'react'

import styles from './Button.module.css'

type Size = 's' | 'm'
type Type = 'danger' | 'disabled' | 'primary' | 'secondary'

interface ButtonProps {
  children: ReactNode
  isFullWidth?: boolean
  isAlignedLeading?: boolean
  onClick?: ReactEventHandler
  size?: Size
  type?: Type
}

const Button: FC<ButtonProps> = ({
  children,
  isAlignedLeading,
  isFullWidth,
  size,
  type,
  ...props
}) => {
  const getClassNames = (size: Size, type: Type) => {
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
      {...props}
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
