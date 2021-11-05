import { ComponentStory, Meta } from '@storybook/react'

import Teaser from './Teaser'

export default {
  title: 'Views/Teaser',
  component: Teaser,
} as Meta

const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />

export const teaser = Template.bind({})
teaser.args = {
  title: 'Example teaser',
  onClick: () => alert('Teaser clicked'),
  date: new Date(),
}

export const active = Template.bind({})
active.args = {
  isActive: true,
  title: 'Example teaser',
  onClick: () => alert('Teaser clicked'),
  date: new Date(),
}

export const untitled = Template.bind({})
untitled.args = {
  onClick: () => alert('Teaser clicked'),
  date: new Date(),
}
