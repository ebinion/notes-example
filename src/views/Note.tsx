import {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
} from 'react' // eslint-disable-line no-unused-vars

import { NoteLike } from '../store'

import { ReactComponent as BarsIcon } from '../icons/bars-solid.svg'
import Editor from './Editor'
import Header from './Header'
import IconedButton from './IconedButton'
import Time from './Time'
import Toolbar from './Toolbar'
import VStack from './VStack'

import styles from './Note.module.css'

const Note = (props: {
  data: NoteLike | null
  toggleIsNavOpen: ReactEventHandler
  updateNote?: (note: NoteLike) => any
}) => {
  const { data, toggleIsNavOpen, updateNote } = props

  const [noteTitle, setNoteTitle] = useState(data!.title)
  const [noteBody, setNoteBody] = useState(data!.body)

  // Handle changes to note date from props
  // useEffect()

  return (
    <article className={styles.wrapper}>
      <Header>
        <Toolbar
          leadingChildren={
            <>
              <i className={styles.backButton}>
                <IconedButton onClick={toggleIsNavOpen}>
                  <BarsIcon />
                </IconedButton>
              </i>

              {data && (
                <div className="text--light text--s">
                  Last edited <Time date={data.lastModifiedDate} />
                </div>
              )}
            </>
          }
        />
      </Header>
      <VStack hasOutterGutter>
        <textarea
          // type="text"
          className={`h1 ${styles.titleInput}`}
          value={noteTitle}
          onChange={(event) => setNoteTitle(event.target.value)}
          placeholder="Untitled Note"
        />
      </VStack>
    </article>
  )
}

export default Note
