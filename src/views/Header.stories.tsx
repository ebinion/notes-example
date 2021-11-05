import { ComponentStory, Meta } from '@storybook/react'

import Header from './Header'

export default {
  title: 'Views/Header',
  component: Header,
} as Meta

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const header = Template.bind({})
header.args = {
  children: 'Example content.',
}

export const sticky = Template.bind({})
sticky.args = {
  children: 'Example content',
  isSticky: true,
}
