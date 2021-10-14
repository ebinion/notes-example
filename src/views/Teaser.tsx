import { FC, MouseEventHandler } from 'react'

import Time from './Time'
import styles from './Teaser.module.css'

interface CardProps {
  date: Date
  isActive?: boolean
  onClick: MouseEventHandler
  title?: string
}

const Card: FC<CardProps> = ({ date, isActive, onClick, title }) => {
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
