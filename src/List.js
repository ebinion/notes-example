import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './List.module.css'

const List = props => {
  return <div className={styles.wrapper}>{props.children}</div>
}

List.propTypes = {
  children: PropTypes.node,
}

List.defaultProps = {}

export default List
