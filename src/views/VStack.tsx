import { FC, ReactNode } from 'react'
import styles from './VStack.module.css'

type Gap = 'xs' | 's' | 'm' | 'l'

interface VStackProps {
  children: ReactNode
  gap?: Gap
  hasOutterGutter?: boolean
}

const VStack: FC<VStackProps> = ({ children, gap, hasOutterGutter }) => {
  const getClassNames = (gapSize: Gap) => {
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
