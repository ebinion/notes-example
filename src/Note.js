import { useState, useRef } from 'react' // eslint-disable-line no-unused-vars

import { ReactComponent as ChevronIcon } from './icons/chevron-left-solid.svg'
import { ReactComponent as TrashIcon } from './icons/trash-solid.svg'
import IconedButton from './IconedButton'
import Toolbar from './Toolbar'
import { AppContext } from './AppContext'
import styles from './Note.module.css'

const Note = props => {
  const [isEditing, setIsEditing] = useState(false)
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

  return (
    <AppContext.Consumer>
      {({ selectNote, toggleIsNavOpen, updateNote }) => {
        const note = selectNote()

        return (
          <div className={styles.wrapper}>
            <div className={styles.toolbar}>
              <Toolbar
                leadingChildren={
                  <IconedButton
                    icon={<ChevronIcon />}
                    onClick={toggleIsNavOpen}
                  />
                }
                trailingChildren={
                  <>
                    {isEditing && (
                      <button
                        onClick={event => handleSave(event, note, updateNote)}
                      >
                        Save
                      </button>
                    )}
                    <IconedButton icon={<TrashIcon />} />
                  </>
                }
              />
            </div>
            <h1
              className={styles.title}
              contentEditable
              onClick={handleEdit}
              ref={titleEleRef}
              dangerouslySetInnerHTML={{ __html: note && note.title }}
            />
            <div
              className={styles.body}
              contentEditable
              onClick={handleEdit}
              ref={bodyEleRef}
              dangerouslySetInnerHTML={{ __html: note && note.body }}
            ></div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

Note.propTypes = {}

Note.defaultProps = {}

export default Note
