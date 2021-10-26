import { useMemo } from 'react'
import { BaseEditor, createEditor, Descendant } from 'slate'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const Editor = (props: {
  onChange: (value: Descendant[]) => any
  value: Descendant[] | null
}) => {
  const defaultValue: Descendant[] = [
    { type: 'paragraph', children: [{ text: '' }] },
  ]

  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate
      editor={editor}
      value={props.value || defaultValue}
      onChange={props.onChange}
    >
      <Editable placeholder="Write here..." />
    </Slate>
  )
}

export default Editor
