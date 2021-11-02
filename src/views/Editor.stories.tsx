import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Editor from './Editor'

export default {
  title: 'Editor',
  component: Editor,
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = (args) => <Editor {...args} />

export const editor = Template.bind({})
editor.args = {}
