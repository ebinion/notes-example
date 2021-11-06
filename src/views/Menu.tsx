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

/** Openable pop-up menu */
const Menu = (props: {
  headerChildren?: ReactNode
  anchor?: Anchor
  /** Use `event.preventDefault()` to stop menu from closing for children element interactions */
  children?: ReactNode
  /** Trigger will be provided with onClick handler to open and close menu */
  trigger: ReactElement
  closeCallback?: Function
  noBottomPad?: Boolean
}) => {
  const {
    anchor,
    children,
    closeCallback,
    headerChildren,
    noBottomPad,
    trigger,
  } = props
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const getClassNames = (anchor: Anchor, isMenuOpen: boolean) => {
    let classNames = [styles.menu]

    if (anchor === 'trailing') {
      classNames.push(styles.menuTrailingAnchor)
    } else {
      classNames.push(styles.menuLeadingAnchor)
    }

    if (isMenuOpen) classNames.push(styles.menuOpen)

    if (noBottomPad) classNames.push(styles.menuNoPadBottom)

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
      if (isMenuOpen) {
        setIsMenuOpen(false)
        if (typeof closeCallback === 'function') closeCallback()
      }
    }
    document.addEventListener('click', handleDocClick)

    isMenuOpen && menuRef?.current?.focus()

    return () => document.removeEventListener('click', handleDocClick)
  }, [isMenuOpen, closeCallback])

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
        {headerChildren && (
          <div className={styles.header}>{headerChildren}</div>
        )}
        {children && <div className={styles.body}>{children}</div>}
      </div>
    </i>
  )
}

Menu.defaultProps = {
  anchor: 'leading',
}

export default Menu
