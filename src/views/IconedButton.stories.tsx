import { ComponentStory, Meta } from '@storybook/react'

import IconedButton from './IconedButton'
import { BarsIcon } from '../icons'

export default {
  title: 'Views/Iconed Button',
  component: IconedButton,
  subcomponents: { BarsIcon },
} as Meta

const handleClick = () => alert('Button clicked')

const Template: ComponentStory<typeof IconedButton> = (args) => (
  <IconedButton {...args} />
)

export const menu = Template.bind({})
menu.args = {
  children: <BarsIcon />,
  onClick: handleClick,
}
