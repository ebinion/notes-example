import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Button.module.css'

const Button = ({
  children,
  isAlignedLeading,
  isFullWidth,
  size,
  type,
  ...props
}) => {
  const getClassNames = (size, type) => {
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
      className={getClassNames(size, type)}
      disabled={type === 'disabled'}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isFullWidth: PropTypes.bool,
  isAlignedLeading: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm']).isRequired,
  type: PropTypes.oneOf(['danger', 'disabled', 'primary', 'secondary'])
    .isRequired,
}

Button.defaultProps = {
  size: 'm',
  type: 'primary',
}

export default Button
