import { ComponentStory, Meta } from '@storybook/react'

import Editor from './Editor'

export default {
  title: 'Views/Editor',
  component: Editor,
} as Meta

const Template: ComponentStory<typeof Editor> = (args) => <Editor {...args} />

export const editor = Template.bind({})
editor.args = {}
