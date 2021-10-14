import PropTypes from 'prop-types'

import styles from './ColumnLayout.module.css'

const ColumnLayout = ({ children }) => {
  return <main className={styles.column}>{children}</main>
}

ColumnLayout.propTypes = {
  children: PropTypes.node,
}

export default ColumnLayout
