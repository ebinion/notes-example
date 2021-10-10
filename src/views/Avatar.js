import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import { ReactComponent as Chevron } from '../icons/chevron-down-solid.svg'
import styles from './Avatar.module.css'

const Avatar = ({ name, ...props }) => {
  const letter = name ? name.charAt(0) : ''

  return (
    <button className={styles.wrapper} {...props}>
      <abbr
        aria-label={`${name}’s settings`}
        title={`${name}’s settings`}
        className={styles.avatar}
      >
        <b className={styles.avatarLetter}>{letter}</b>
      </abbr>
      <i className={styles.icon}>
        <Chevron />
      </i>
    </button>
  )
}

Avatar.propTypes = {
  name: PropTypes.string,
}

Avatar.defaultProps = {}

export default Avatar
