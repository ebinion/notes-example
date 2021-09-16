import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Teaser.module.css'

const addLeadingZero = num => {
  const numString = num.toString()

  if (numString.length === 1) {
    return `0${numString}`
  } else {
    return numString
  }
}

const createZuluDateString = dateObj => {
  const year = dateObj.getUTCFullYear()
  const month = addLeadingZero(dateObj.getUTCMonth() + 1)
  const date = addLeadingZero(dateObj.getUTCDate())

  const hours = addLeadingZero(dateObj.getUTCHours())
  const minutes = addLeadingZero(dateObj.getUTCMinutes())
  const seconds = addLeadingZero(dateObj.getUTCSeconds())

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`
}

const Card = props => {
  const date = props.date

  const dateString = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`

  return (
    <button
      onClick={props.onClick}
      className={`${styles.wrapper} ${
        props.isActive ? styles.wrapperIsActive : ''
      }`}
    >
      <h3
        dangerouslySetInnerHTML={{ __html: props.title || 'Untitled Note' }}
        className="h4 text--truncated text--noMargin"
      />
      <div className="text--light">
        <time dateTime={createZuluDateString(date)}>{dateString}</time>
      </div>
    </button>
  )
}

Card.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
}

Card.defaultProps = {}

export default Card
