import { ComponentStory, Meta } from '@storybook/react'

import Container from './Container'

export default {
  title: 'Views/Container',
  component: Container,
} as Meta

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
)

export const container = Template.bind({})
container.args = {
  children: 'Example content.',
}

export const stickyTop = Template.bind({})
stickyTop.args = {
  children: 'Example content',
  sticky: 'top',
}

export const stickyBottom = Template.bind({})
stickyBottom.args = {
  children: 'Example content',
  sticky: 'bottom',
}

export const padAll = Template.bind({})
padAll.args = {
  children: 'Example content',
  pad: 'all',
}

export const padTop = Template.bind({})
padTop.args = {
  children: 'Example content',
  pad: 'top',
}

export const padBottom = Template.bind({})
padBottom.args = {
  children: 'Example content',
  pad: 'bottom',
}

export const padVertical = Template.bind({})
padVertical.args = {
  children: 'Example content',
  pad: 'vertical',
}

export const padHorizontal = Template.bind({})
padHorizontal.args = {
  children: 'Example content',
  pad: 'horizontal',
}
