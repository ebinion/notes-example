import { ComponentStory, Meta } from '@storybook/react'

import Button from './Button'

export default {
  title: 'Views/Button',
  component: Button,
} as Meta

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const button = Template.bind({})
button.args = {
  children: 'Button',
  onClick: () => alert('Button clicked'),
}

export const danger = Template.bind({})
danger.args = {
  children: 'Danger Button',
  type: 'danger',
  onClick: () => alert('Button clicked'),
}

export const disabled = Template.bind({})
disabled.args = {
  children: 'Disabled Button',
  type: 'disabled',
  onClick: () => alert('Button clicked'),
}

export const secondary = Template.bind({})
secondary.args = {
  children: 'Secondary Button',
  type: 'secondary',
  onClick: () => alert('Button clicked'),
}

export const small = Template.bind({})
small.args = {
  children: 'Small Button',
  onClick: () => alert('Button clicked'),
  size: 's',
}

export const warn = Template.bind({})
small.args = {
  children: 'Small Button',
  onClick: () => alert('Button clicked'),
  type: 'warning',
}
