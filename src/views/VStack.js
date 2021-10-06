import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './VStack.module.css'

const VStack = ({ children, gap, hasOutterGutter }) => {
  const getClassNames = gapSize => {
    let classNames = [styles.wrapper]

    switch (gapSize) {
      case 'xs':
        classNames.push(styles.gapXs)
        break
      case 's':
        classNames.push(styles.gapS)
        break
      default:
        break
    }

    if (hasOutterGutter) classNames.push(styles.outterGutter)

    return classNames.join(' ')
  }

  return <div className={getClassNames(gap)}>{children}</div>
}

VStack.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOf(['xs', 's', 'm']),
  hasOutterGutter: PropTypes.bool,
}

VStack.defaultProps = {
  gap: 'm',
}

export default VStack
