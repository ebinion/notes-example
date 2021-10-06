import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './Menu.module.css'

const Menu = ({ anchor, children, trigger }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef()

  const getClassNames = (anchor, isMenuOpen) => {
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

  const handleTriggerClick = event => {
    event.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClick = event => {
    event.defaultPrevented && isMenuOpen && event.stopPropagation()
  }

  useEffect(() => {
    const handleDocClick = event => {
      isMenuOpen && setIsMenuOpen(false)
    }
    document.addEventListener('click', handleDocClick)

    isMenuOpen && menuRef.current.focus()

    return () => document.removeEventListener('click', handleDocClick)
  }, [isMenuOpen])

  return (
    <i className={styles.wrapper}>
      {React.cloneElement(trigger, { onClick: handleTriggerClick })}
      <div
        className={getClassNames(anchor, isMenuOpen)}
        aria-hidden={!isMenuOpen && 'true'}
        tabIndex="-1"
        onClick={handleMenuClick}
        ref={menuRef}
        role="menu"
      >
        {children}
      </div>
    </i>
  )
}

Menu.propTypes = {
  anchor: PropTypes.oneOf(['leading', 'trailing']),
  children: PropTypes.node,
  trigger: PropTypes.element,
}

Menu.defaultProps = {
  anchor: 'leading',
}

export default Menu
