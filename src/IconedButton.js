import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './IconedButton.module.css'

const IconedLink = props => {
  return (
    <button onClick={props.onClick} className={styles.wrapper}>
      {props.icon}
    </button>
  )
}

IconedLink.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func,
}

IconedLink.defaultProps = {}

export default IconedLink
