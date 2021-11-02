import { ChangeEvent, KeyboardEventHandler, useState } from 'react'
import styles from './NoteTitle.module.css'

const NoteTitle = (props: {
  onChange: (value: string) => any
  placeholder: string
  value: string
}) => {
  const { onChange, placeholder, value } = props

  const [hasSpellcheck, setHasSpellcheck] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter') event.preventDefault()
  }

  return (
    <div className={styles.wrapper}>
      <div className={`h1 ${styles.dupContent}`} aria-hidden="true">
        {value ? value : 'A'}
      </div>
      <textarea
        className={`h1 ${styles.textarea}`}
        onBlur={() => setHasSpellcheck(false)}
        onChange={handleChange}
        onFocus={() => setHasSpellcheck(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        spellCheck={hasSpellcheck}
        value={value}
      />
    </div>
  )
}

export default NoteTitle
