import { ComponentStory, Meta } from '@storybook/react'

import VStack from './VStack'

export default {
  title: 'Views/VStack',
  component: VStack,
} as Meta

const Template: ComponentStory<typeof VStack> = (args) => (
  <VStack {...args}>
    <div>Here's</div>
    <div>an</div>
    <div>example</div>
  </VStack>
)

export const vStack = Template.bind({})
vStack.storyName = 'VStack'

export const extraSmallGap = Template.bind({})
extraSmallGap.args = {
  gap: 'xs',
}

export const smallGap = Template.bind({})
smallGap.args = {
  gap: 's',
}

export const largeGap = Template.bind({})
largeGap.args = {
  gap: 'l',
}
