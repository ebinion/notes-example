import { useEffect, useState, useRef } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import { ReactComponent as BarsIcon } from '../icons/bars-solid.svg'
import Button from './Button'
import Header from './Header'
import IconedButton from './IconedButton'
import Time from './Time'
import Toolbar from './Toolbar'
import VStack from './VStack'

import styles from './Note.module.css'

const Note = ({ data, toggleIsNavOpen, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [titleHasContent, setTitleHasContent] = useState(false)
  const [bodyHasContent, setBodyHasContent] = useState(false)
  const titleEleRef = useRef()
  const bodyEleRef = useRef()

  const addFieldChangeListener = (element, callback) => {
    const handleChange = (mutatuionsList, observer) => {
      callback(mutatuionsList, observer)
    }

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    }

    const observer = new MutationObserver(handleChange)
    observer.observe(element, config)

    return () => {
      observer.disconnect()
    }
  }

  const handleEdit = event => {
    event.preventDefault()
    setIsEditing(true)
  }

  const handleSave = (event, note, updateNote) => {
    event.preventDefault()

    const newNote = Object.assign({}, note, {
      body: bodyEleRef.current.innerHTML,
      title: titleEleRef.current.innerHTML,
    })

    updateNote(newNote)
    setIsEditing(false)
  }

  const handleBodyClick = () => {
    bodyEleRef.current.focus()
  }

  useEffect(() => {
    const disconnect = addFieldChangeListener(titleEleRef.current, () => {
      setTitleHasContent(titleEleRef.current.innerHTML !== '')
    })

    return disconnect
  }, [titleEleRef])

  useEffect(() => {
    const disconnect = addFieldChangeListener(bodyEleRef.current, () => {
      setBodyHasContent(bodyEleRef.current.innerHTML !== '')
    })

    return disconnect
  }, [bodyEleRef])

  return (
    <article className={styles.wrapper}>
      <Header>
        <Toolbar
          leadingChildren={
            <>
              <IconedButton icon={<BarsIcon />} onClick={toggleIsNavOpen} />

              <div className="text--light text--s">
                Last edited <Time date={data.lastModifiedDate} />
              </div>
            </>
          }
          trailingChildren={
            isEditing && (
              <Button
                onClick={event => handleSave(event, data, updateNote)}
                size="s"
              >
                Save
              </Button>
            )
          }
        />
      </Header>
      <VStack hasOutterGutter>
        <div className={styles.header}>
          <h1
            className={`${styles.headerHeading} text--noMargin`}
            contentEditable
            onClick={handleEdit}
            ref={titleEleRef}
            dangerouslySetInnerHTML={{ __html: data && data.title }}
          />
          <div className={styles.headerPlaceholder}>
            <div className="h1 text--light">
              {titleHasContent ? '' : 'Untitled Note'}
            </div>
          </div>
        </div>

        <div className={styles.body} onClick={handleBodyClick}>
          <div
            className={styles.bodyContent}
            contentEditable
            onClick={handleEdit}
            ref={bodyEleRef}
            dangerouslySetInnerHTML={{ __html: data && data.body }}
          />
          <div className={styles.bodyPlaceholder}>
            <div className="text--light">
              {bodyHasContent ? '' : 'Write here'}
            </div>
          </div>
        </div>
      </VStack>
    </article>
  )
}

Note.propTypes = {
  data: PropTypes.object,
  toggleIsNavOpen: PropTypes.func,
  updateNote: PropTypes.func,
}

Note.defaultProps = {}

export default Note
