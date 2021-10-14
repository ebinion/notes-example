import {
  FC,
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
} from 'react' // eslint-disable-line no-unused-vars

import { ReactComponent as BarsIcon } from '../icons/bars-solid.svg'
import Button from './Button'
import Header from './Header'
import IconedButton from './IconedButton'
import Time from './Time'
import Toolbar from './Toolbar'
import VStack from './VStack'
import { NoteType } from '../AppContext'

import styles from './Note.module.css'

type NoteData = {
  lastModifiedDate: Date
  id: string
  createdDate: Date
  title: string
  body: string
}

interface NoteProps {
  data?: NoteData
  toggleIsNavOpen: ReactEventHandler
  updateNote: Function
}

const Note: FC<NoteProps> = ({ data, toggleIsNavOpen, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [titleHasContent, setTitleHasContent] = useState(false)
  const [bodyHasContent, setBodyHasContent] = useState(false)
  const titleEleRef = useRef<HTMLHeadingElement>(null)
  const bodyEleRef = useRef<HTMLDivElement>(null)

  const addFieldChangeListener = (element: HTMLElement, callback: Function) => {
    const handleChange: MutationCallback = (
      mutatuionsList: MutationRecord[],
      observer: MutationObserver
    ) => {
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

  const handleEdit: ReactEventHandler = (event) => {
    event.preventDefault()
    setIsEditing(true)
  }

  const handleSave = (
    event: SyntheticEvent,
    note: NoteType,
    updateNote: Function
  ) => {
    event.preventDefault()

    const newNote = Object.assign({}, note, {
      body: bodyEleRef.current && bodyEleRef.current.innerHTML,
      title: titleEleRef.current && titleEleRef.current.innerHTML,
    })

    updateNote(newNote)
    setIsEditing(false)
  }

  const handleBodyClick = () => {
    bodyEleRef.current && bodyEleRef.current.focus()
  }

  useEffect(() => {
    if (titleEleRef.current !== null) {
      const disconnect = addFieldChangeListener(titleEleRef.current, () => {
        if (
          titleEleRef.current &&
          titleEleRef.current.innerHTML !== '<br>' &&
          titleEleRef.current.innerHTML
        ) {
          setTitleHasContent(true)
        } else {
          setTitleHasContent(false)
        }
      })

      return disconnect
    }
  }, [])

  useEffect(() => {
    if (bodyEleRef.current) {
      const disconnect = addFieldChangeListener(bodyEleRef.current, () => {
        bodyEleRef.current &&
          setBodyHasContent(bodyEleRef.current.innerHTML !== '')
      })

      return disconnect
    }
  }, [bodyEleRef])

  return (
    <article className={styles.wrapper}>
      <Header>
        <Toolbar
          leadingChildren={
            <>
              <IconedButton onClick={toggleIsNavOpen}>
                <BarsIcon />
              </IconedButton>

              {data && (
                <div className="text--light text--s">
                  Last edited <Time date={data.lastModifiedDate} />
                </div>
              )}
            </>
          }
          trailingChildren={
            isEditing && (
              <Button
                onClick={(event) =>
                  data && updateNote && handleSave(event, data, updateNote)
                }
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
            dangerouslySetInnerHTML={{ __html: data ? data.title : '' }}
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
            dangerouslySetInnerHTML={data && { __html: data.body }}
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

export default Note
