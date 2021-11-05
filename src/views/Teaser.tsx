import { MouseEventHandler } from 'react'

import Time from './TimeAgo'
import styles from './Teaser.module.css'

const Card = (props: {
  date: Date | string
  isActive?: boolean
  onClick: MouseEventHandler
  title?: string
}) => {
  const { date, isActive, onClick, title } = props
  return (
    <button
      onClick={onClick}
      className={`${styles.wrapper} ${isActive ? styles.wrapperIsActive : ''}`}
    >
      <h3
        dangerouslySetInnerHTML={{ __html: title || 'Untitled Note' }}
        className="h4 text--truncated text--noMargin"
      />
      <div className="text--s text--light">
        <Time date={date} />
      </div>
    </button>
  )
}

Card.defaultProps = {}

export default Card
