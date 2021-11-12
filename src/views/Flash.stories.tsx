import { ComponentStory, Meta } from '@storybook/react'

import Flash from './Flash'

export default {
  title: 'Views/Flash',
  component: Flash,
} as Meta

const Template: ComponentStory<typeof Flash> = (args) => <Flash {...args} />

export const flash = Template.bind({})
flash.args = {
  closeHandler: () =>
    alert(
      "It’s best if you remove the 'Flash' from the dom for animation purposes"
    ),
  message: {
    title: 'Error title',
    body: 'A more detailed message goes here, keep it short.',
  },
}
