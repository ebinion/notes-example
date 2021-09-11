import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Toolbar.module.css'

const Toolbar = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leading}>
        {props.children || props.leadingChildren}
      </div>
      <div className={styles.trailing}>{props.trailingChildren}</div>
    </div>
  )
}

Toolbar.propTypes = {
  children: PropTypes.node,
  leadingChildren: PropTypes.node,
  trailingChildren: PropTypes.node,
}

Toolbar.defaultProps = {}

export default Toolbar
