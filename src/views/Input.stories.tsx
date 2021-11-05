import { ComponentStory, Meta } from '@storybook/react'

import Input from './Input'

export default {
  title: 'Views/Input',
  component: Input,
} as Meta

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const input = Template.bind({})
input.args = {
  label: 'Example label',
  placeholder: 'Example placeholder',
}
