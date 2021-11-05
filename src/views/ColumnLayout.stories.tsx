import { ComponentStory, Meta } from '@storybook/react'

import ColumnLayout from './ColumnLayout'

export default {
  title: 'Layouts/Column Layout',
  component: ColumnLayout,
} as Meta

const Template: ComponentStory<typeof ColumnLayout> = (args) => (
  <ColumnLayout {...args} />
)

export const columnLayout = Template.bind({})
columnLayout.args = {
  children: 'Layout content goes here',
}
