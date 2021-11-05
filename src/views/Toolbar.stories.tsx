import { ComponentStory, Meta } from '@storybook/react'

import Toolbar from './Toolbar'

export default {
  title: 'Views/Toolbar',
  component: Toolbar,
} as Meta

const Template: ComponentStory<typeof Toolbar> = (args) => <Toolbar {...args} />

export const toolbar = Template.bind({})
toolbar.args = {
  children: 'Center section',
  leadingChildren: 'Leading section',
  trailingChildren: 'Trailing section',
}
