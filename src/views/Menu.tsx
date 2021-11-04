import {
  cloneElement,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import styles from './Menu.module.css'

type Anchor = 'leading' | 'trailing'

const Menu = (props: {
  anchor?: Anchor
  children: ReactNode
  trigger: ReactElement
}) => {
  const { anchor, children, trigger } = props
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const getClassNames = (anchor: Anchor, isMenuOpen: boolean) => {
    let classNames = [styles.menu]

    if (anchor === 'trailing') {
      classNames.push(styles.menuTrailingAnchor)
    } else {
      classNames.push(styles.menuLeadingAnchor)
    }

    if (isMenuOpen) {
      classNames.push(styles.menuOpen)
    }

    return classNames.join(' ')
  }

  const handleTriggerClick = (event: SyntheticEvent) => {
    event.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClick = (event: SyntheticEvent) => {
    event.defaultPrevented && isMenuOpen && event.stopPropagation()
  }

  useEffect(() => {
    const handleDocClick = (event: Event) => {
      isMenuOpen && setIsMenuOpen(false)
    }
    document.addEventListener('click', handleDocClick)

    isMenuOpen && menuRef?.current?.focus()

    return () => document.removeEventListener('click', handleDocClick)
  }, [isMenuOpen])

  return (
    <i className={styles.wrapper}>
      {cloneElement(trigger, { onClick: handleTriggerClick })}
      <div
        className={anchor && getClassNames(anchor, isMenuOpen)}
        aria-hidden={!isMenuOpen && 'true'}
        tabIndex={-1}
        onClick={handleMenuClick}
        ref={menuRef}
        role="menu"
      >
        {children}
      </div>
    </i>
  )
}

Menu.defaultProps = {
  anchor: 'leading',
}

export default Menu
