import { ComponentStory, Meta } from '@storybook/react'

import Button from './Button'
import Menu from './Menu'

export default {
  title: 'Views/Menu',
  component: Menu,
} as Meta

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />

export const menu = Template.bind({})
menu.args = {
  trigger: <Button>Menu</Button>,
  children: 'Menu content',
}

export const anchoredTrailing = Template.bind({})
anchoredTrailing.args = {
  anchor: 'trailing',
  trigger: <Button>Menu</Button>,
  children: 'Menu content',
}
