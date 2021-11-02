import { useState, useEffect } from 'react'
import { ComponentStory } from '@storybook/react'
import NoteTitle from './NoteTitle'

export default {
  title: 'Note Title',
  component: NoteTitle,
}

const Template: ComponentStory<typeof NoteTitle> = (args) => {
  const modifiedArgs = { ...args }

  const [value, setValue] = useState(args.value)
  modifiedArgs.value = value

  modifiedArgs.onChange = (_value) => setValue(_value)

  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return <NoteTitle {...modifiedArgs} />
}

export const noteTitle = Template.bind({})
noteTitle.args = {
  placeholder: 'Placeholder',
  value: '',
}
