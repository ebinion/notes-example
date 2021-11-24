import { KeyboardEventHandler, useCallback, useMemo, useState } from 'react'
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

const toggleMark = (
  format: FormatLike,
  editor: EditorLike,
  Editor = SlateEditor
) => {
  console.log('adding mark')
  if (isMarkActive(format, editor, Editor)) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (
  format: FormatLike,
  editor: EditorLike,
  Editor = SlateEditor
) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Editor = (props: {
  onChange: (value: Descendant[]) => any
  value: Descendant[] | null
}) => {
  const defaultValue: Descendant[] = [
    { type: 'paragraph', children: [{ text: '' }] },
  ]
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const [keysLog, setKeysLog] = useState({} as { [k: string]: boolean })

  const editor = useMemo(() => withReact(createEditor()), [])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    const newKeysLog = { ...keysLog, [event.key.toLowerCase()]: true }
    console.log(newKeysLog)

    if (newKeysLog.meta) {
      if (newKeysLog.b) toggleMark('bold', editor)

      if (newKeysLog.i) toggleMark('italic', editor)

      if (newKeysLog.u) toggleMark('underline', editor)

      if (newKeysLog.l) toggleMark('code', editor)
    }

    setKeysLog(newKeysLog)
  }

  const handleKeyUp: KeyboardEventHandler = (event) => {
    // console.log(keysLog)
    setKeysLog({})
  }

  return (
    <Slate
      editor={editor}
      value={props.value || defaultValue}
      onChange={props.onChange}
    >
      <Editable
        placeholder="Write here..."
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        spellCheck
      />
    </Slate>
  )
}

export default Editor
