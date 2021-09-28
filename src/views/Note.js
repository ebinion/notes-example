import { useEffect, useState, useRef } from 'react' // eslint-disable-line no-unused-vars

import { AppContext } from '../AppContext'
import { ReactComponent as ChevronIcon } from '../icons/chevron-left-solid.svg'
import IconedButton from './IconedButton'
import Time from './Time'
import Toolbar from './Toolbar'

import styles from './Note.module.css'

const Note = props => {
  const [isEditing, setIsEditing] = useState(false)
  const [titleHasContent, setTitleHasContent] = useState(false)
  const [bodyHasContent, setBodyHasContent] = useState(false)
  const titleEleRef = useRef()
  const bodyEleRef = useRef()

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
    const handleTitleChange = (mutatuionsList, observer) => {
      setTitleHasContent(titleEleRef.current.innerHTML !== '')
    }

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    }
    const observer = new MutationObserver(handleTitleChange)
    observer.observe(titleEleRef.current, config)

    return () => {
      observer.disconnect()
    }
  }, [titleEleRef])

  useEffect(() => {
    const handleBodyChange = (mutatuionsList, observer) => {
      setBodyHasContent(bodyEleRef.current.innerHTML !== '')
    }

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    }
    const observer = new MutationObserver(handleBodyChange)
    observer.observe(bodyEleRef.current, config)

    return () => {
      observer.disconnect()
    }
  }, [bodyEleRef])

  return (
    <AppContext.Consumer>
      {({ selectNote, toggleIsNavOpen, updateNote }) => {
        const note = selectNote()

        return (
          <article className={styles.wrapper}>
            <div className={styles.toolbar}>
              <Toolbar
                leadingChildren={
                  <>
                    <i className={styles.backButton}>
                      <IconedButton
                        icon={<ChevronIcon />}
                        onClick={toggleIsNavOpen}
                      />
                    </i>

                    <span className="text--light text--s">
                      Last edited <Time date={note.lastModifiedDate} />
                    </span>
                  </>
                }
                trailingChildren={
                  isEditing && (
                    <button
                      onClick={event => handleSave(event, note, updateNote)}
                    >
                      Save
                    </button>
                  )
                }
              />
            </div>
            <header className={styles.header}>
              <h1
                className={`${styles.headerHeading} text--noMargin`}
                contentEditable
                onClick={handleEdit}
                ref={titleEleRef}
                dangerouslySetInnerHTML={{ __html: note && note.title }}
              />
              <div className={styles.headerPlaceholder}>
                <div className="h1 text--light">
                  {titleHasContent ? '' : 'Untitled Note'}
                </div>
              </div>
            </header>

            <div className={styles.body} onClick={handleBodyClick}>
              <div
                className={styles.bodyContent}
                contentEditable
                onClick={handleEdit}
                ref={bodyEleRef}
                dangerouslySetInnerHTML={{ __html: note && note.body }}
              />
              <div className={styles.bodyPlaceholder}>
                <div className="text--light">
                  {bodyHasContent ? '' : 'Write here'}
                </div>
              </div>
            </div>
          </article>
        )
      }}
    </AppContext.Consumer>
  )
}

Note.propTypes = {}

Note.defaultProps = {}

export default Note
