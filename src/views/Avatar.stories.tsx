import { ComponentStory, Meta } from '@storybook/react'

import Avatar from './Avatar'

export default {
  title: 'Views/Avatar',
  component: Avatar,
} as Meta

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const avatar = Template.bind({})
avatar.args = {
  name: 'John',
  onClick: () => alert('Button was clicked'),
}
