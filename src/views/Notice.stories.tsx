import { ComponentStory, Meta } from '@storybook/react'

import Notice from './Notice'

export default {
  title: 'Views/Notice',
  component: Notice,
} as Meta

const Template: ComponentStory<typeof Notice> = (args) => <Notice {...args} />

export const notice = Template.bind({})
notice.args = {
  children: JSON.stringify(
    'This is a notice, with a <a href="http://example.com">link</a>'
  ),
}
