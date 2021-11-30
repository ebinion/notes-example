import { animate } from 'framer-motion'
import { KeyboardEventHandler, useCallback, useMemo, useRef } from 'react'
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor as SlateEditor,
} from 'slate'
import {
  Slate,
  Editable,
  ReactEditor,
  RenderLeafProps,
  withReact,
} from 'slate-react'

import { BoldIcon, ItalicIcon, CodeIcon } from '../icons'
import { Container, IconedButton } from '../views'

import styles from './Editor.module.css'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = {
  bold?: true
  code?: true
  italic?: true
  text: string
  underline?: true
}
type EditorLike = BaseEditor & ReactEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: EditorLike
    Element: CustomElement
    Text: CustomText
  }
}

type FormatLike = 'bold' | 'code' | 'italic' | 'underline'

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, leaf } = props

  if (leaf.bold) {
    return <strong {...attributes}>{children}</strong>
  }

  if (leaf.code) {
    return <code {...attributes}>{children}</code>
  }

  if (leaf.italic) {
    return <em {...attributes}>{children}</em>
  }

  if (leaf.underline) {
    return <u {...attributes}>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const isMarkActive = (
  format: FormatLike,
  editor: EditorLike,
  Editor = SlateEditor
) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (
  format: FormatLike,
  editor: EditorLike,
  Editor = SlateEditor
) => {
  if (isMarkActive(format, editor, Editor)) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const Editor = (props: {
  onChange: (value: Descendant[]) => any
  value: Descendant[] | null
}) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const defaultValue: Descendant[] = [
    { type: 'paragraph', children: [{ text: '' }] },
  ]
  const editor = useMemo(() => withReact(createEditor()), [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (
      (event.metaKey && navigator.userAgent.indexOf('Mac OS X') !== -1) ||
      event.ctrlKey
    ) {
      event.preventDefault()
      if (event.key === 'b') toggleMark('bold', editor)
      if (event.key === 'i') toggleMark('italic', editor)
      if (event.key === 'u') toggleMark('underline', editor)
      if (event.key === '`') toggleMark('code', editor)
    }

    updateScrollPosition()
  }

  const updateScrollPosition = () => {
    const cursorPosY = window
      .getSelection()
      ?.getRangeAt(0)
      ?.getBoundingClientRect().top
    const windowHeight = window.visualViewport
      ? window.visualViewport.height
      : document.querySelector('html')?.clientHeight

    if (cursorPosY && windowHeight) {
      const safeBottom = windowHeight * 0.6
      const targetPosY = windowHeight * 0.5

      const scrollPosY = window.scrollY

      if (cursorPosY > safeBottom) {
        const newScrollY = (targetPosY - cursorPosY) * -1 + window.scrollY
        animate(scrollPosY, newScrollY, {
          ease: 'easeOut',
          onUpdate: (scrollPosY) => {
            window.scrollTo(0, scrollPosY)
          },
        })
      }
    }
  }

  return (
    <Slate
      editor={editor}
      value={props.value || defaultValue}
      onChange={props.onChange}
    >
      <Container pad="horizontal">
        <div className={styles.editable} ref={editorRef}>
          <Editable
            placeholder="Write here..."
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
            spellCheck
          />
        </div>
      </Container>
      <Container pad="horizontal" sticky="bottom">
        <div className={styles.toolbar}>
          <IconedButton
            isActive={isMarkActive('bold', editor)}
            onClick={() => toggleMark('bold', editor)}
          >
            <BoldIcon title="Bold" />
          </IconedButton>
          <IconedButton
            isActive={isMarkActive('italic', editor)}
            onClick={() => toggleMark('italic', editor)}
          >
            <ItalicIcon title="Italic" />
          </IconedButton>
          <IconedButton
            isActive={isMarkActive('code', editor)}
            onClick={() => toggleMark('code', editor)}
          >
            <CodeIcon title="Code" />
          </IconedButton>
        </div>
      </Container>
    </Slate>
  )
}

export default Editor
