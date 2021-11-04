import { ComponentStory, Meta } from '@storybook/react'

import TimeAgo from './TimeAgo'

export default {
  title: 'Views/Time Ago',
  component: TimeAgo,
} as Meta

const Template: ComponentStory<typeof TimeAgo> = (args) => <TimeAgo {...args} />

export const timeAgo = Template.bind({})
timeAgo.args = {
  date: new Date(),
}
