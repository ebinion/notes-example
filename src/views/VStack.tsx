import { ReactNode } from 'react'
import styles from './VStack.module.css'

type GapLike = 'xs' | 's' | 'm' | 'l'

const VStack = (props: {
  children: ReactNode
  gap?: GapLike
  hasOutterGutter?: boolean
}) => {
  const { children, gap, hasOutterGutter } = props
  const getClassNames = (gapSize: GapLike) => {
    let classNames = [styles.wrapper]

    switch (gapSize) {
      case 'l':
        classNames.push(styles.gapL)
        break
      case 's':
        classNames.push(styles.gapS)
        break
      case 'xs':
        classNames.push(styles.gapXs)
        break
      default:
        break
    }

    if (hasOutterGutter) classNames.push(styles.outterGutter)

    return classNames.join(' ')
  }

  return <div className={getClassNames(gap || 'm')}>{children}</div>
}

export default VStack
