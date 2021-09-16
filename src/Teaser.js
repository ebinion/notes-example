import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import styles from './Teaser.module.css'

const Card = props => {
  const dateString = `${
    props.date.getMonth() + 1
  }/${props.date.getDate()}/${props.date.getFullYear()}`

  return (
    <button
      onClick={props.onClick}
      className={`${styles.wrapper} ${
        props.isActive ? styles.wrapperIsActive : ''
      }`}
    >
      <h3
        dangerouslySetInnerHTML={{ __html: props.title || 'Untitled Note' }}
        className={`${styles.title} text--noMargin`}
      />
      <div className={styles.date}>
        <time className="text--light">{dateString}</time>
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
