import { motion } from 'framer-motion'
import { ReactEventHandler } from 'react'

import { ExclamationIcon, XIcon } from '../icons'
import { IconedButton } from '.'

import styles from './Flash.module.css'

const animationVariants = () => {
  if (window.matchMedia('(minWidth: 600px)').matches) {
    return {
      inert: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50, zIndex: 'var(--z-above-everything)' },
    }
  } else {
    return {
      inert: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50, zIndex: 'var(--z-above-everything)' },
    }
  }
}

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
    <motion.div
      animate="inert"
      aria-describedby="flash-message"
      aria-labelledby={typeof message === 'string' ? undefined : 'flash-title'}
      className={styles.wrapper}
      exit="exit"
      initial="exit"
      role="alertdialog"
      variants={animationVariants()}
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
    </motion.div>
  )
}

export default Flash
