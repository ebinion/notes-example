import PropTypes from 'prop-types'

import styles from './Header.module.css'

const Header = ({ children, isSticky, role }) => {
  return (
    <header
      role={role}
      className={`${styles.wrapper} ${isSticky && styles.wrapperIsSticky}`}
    >
      {children}
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  isSticky: PropTypes.bool,
  role: PropTypes.string,
}

Header.defaultProps = {}

export default Header
