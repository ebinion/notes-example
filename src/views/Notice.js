import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Notice.module.css'
import { ReactComponent as ExclamationIcon } from '../icons/exclamation-circle-solid.svg'

const Notice = ({ children }) => {
  return (
    <div className={styles.wrapper} role="alert">
      <div className={styles.icon}>
        <ExclamationIcon />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

Notice.propTypes = {
  children: PropTypes.node,
}

Notice.defaultProps = {}

export default Notice
