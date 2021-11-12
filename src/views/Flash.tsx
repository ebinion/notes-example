import { ReactEventHandler } from 'react'

import { ExclamationIcon, XIcon } from '../icons'
import { IconedButton } from '.'

import styles from './Flash.module.css'

const Flash = (props: {
  closeHandler: ReactEventHandler
  message: { title: string; body: string } | string
}) => {
  const { closeHandler, message } = props

  const renderMessage = () => {
    if (typeof message === 'string') {
      return (
        <p id="flash-message" className="text--s text--noMargin">
          {message}
        </p>
      )
    } else {
      return (
        <>
          <h3 id="flash-title" className="h4 text--noMargin">
            {message.title}
          </h3>
          <p id="flash-message" className="text--s text--noMargin">
            {message.body}
          </p>
        </>
      )
    }
  }

  return (
    <div
      className={styles.wrapper}
      role="alertdialog"
      aria-labelledby={typeof message === 'string' ? undefined : 'flash-title'}
      aria-describedby="flash-message"
    >
      <div className={styles.doc} role="document" tabIndex={0}>
        <div className={styles.icon}>
          <ExclamationIcon title="Exclamation Icon" />
        </div>
        <div className={styles.message}>{renderMessage()}</div>
        <div className={styles.close}>
          <IconedButton onClick={closeHandler}>
            <XIcon title="Close Icon" />
          </IconedButton>
        </div>
      </div>
    </div>
  )
}

export default Flash
