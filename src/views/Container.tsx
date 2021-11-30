import { AriaRole, createElement, ReactNode } from 'react'

import styles from './Container.module.css'

/**
 * Use to create consistent spacing in app.
 */
const Container = (props: {
  as: 'article' | 'div' | 'footer' | 'header' | 'section'
  children: ReactNode
  /** 'Top' affixes the container to the top of the screen on scroll */
  sticky?: 'bottom' | 'top'
  pad?: 'top' | 'bottom' | 'vertical' | 'horizontal' | 'all'
  role?: AriaRole
}) => {
  const { as, children, sticky, pad, role } = props

  const getClassNames = () => {
    const classNames = [styles.wrapper]

    if (sticky === 'bottom') classNames.push(styles.stickyBottom)
    if (sticky === 'top') classNames.push(styles.stickyTop)

    if (pad) {
      switch (pad) {
        case 'all':
          classNames.push(styles.padAll)
          break
        case 'bottom':
          classNames.push(styles.padBottom)
          break
        case 'top':
          classNames.push(styles.padTop)
          break
        case 'horizontal':
          classNames.push(styles.padHorizontal)
          break
        case 'vertical':
          classNames.push(styles.padVertical)
          break
        default:
          break
      }
    }

    return classNames.join(' ')
  }

  return createElement(as, {
    children,
    className: getClassNames(),
    role,
  })
}

Container.defaultProps = {
  as: 'div',
}

export default Container
