import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './IconedButton.module.css'

const IconedLink = ({ icon, ...props }) => {
  return (
    <button className={styles.wrapper} {...props}>
      {icon}
    </button>
  )
}

IconedLink.propTypes = {
  icon: PropTypes.element,
}

IconedLink.defaultProps = {}

export default IconedLink
