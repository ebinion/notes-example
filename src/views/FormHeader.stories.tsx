import { ComponentStory, Meta } from '@storybook/react'

import FormHeader from './FormHeader'

export default {
  title: 'Views/Form Header',
  component: FormHeader,
} as Meta

const Template: ComponentStory<typeof FormHeader> = (args) => (
  <FormHeader {...args} />
)

export const formHeader = Template.bind({})
formHeader.args = {
  children: 'Example content.',
}
