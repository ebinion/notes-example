import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import Time from './Time'
import styles from './Teaser.module.css'

const Card = props => {
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
        <Time date={props.date} />
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
