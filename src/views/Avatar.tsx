import { FC, ReactEventHandler } from 'react'

import { ReactComponent as Chevron } from '../icons/chevron-down-solid.svg'
import styles from './Avatar.module.css'

interface AvatarProps {
  name?: string
  onClick?: ReactEventHandler
}

const Avatar: FC<AvatarProps> = ({ name, ...props }) => {
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

export default Avatar
