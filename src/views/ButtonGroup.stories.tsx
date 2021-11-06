import { ComponentStory, Meta } from '@storybook/react'

import { Button, ButtonGroup } from '.'

export default {
  title: 'Views/Button Group',
  component: ButtonGroup,
  subcomponents: { Button },
} as Meta

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args}>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
)

export const buttonGroup = Template.bind({})
