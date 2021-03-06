import { ReactNode } from 'react'
import styles from './VStack.module.css'

type GapLike = 'xs' | 's' | 'm' | 'l'

const VStack = (props: { children: ReactNode; gap?: GapLike }) => {
  const { children, gap } = props
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

    return classNames.join(' ')
  }

  return <div className={getClassNames(gap || 'm')}>{children}</div>
}

export default VStack
