import { ComponentStory, Meta } from '@storybook/react'

import {
  BarsIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EllipsisIcon,
  ExclamationIcon,
  PlusIcon,
  XIcon,
} from './'

export default {
  title: 'Views/Icons',
  component: BarsIcon,
  argTypes: {
    title: { control: 'text' },
  },
  args: {
    title: 'Icon title',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '48px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta

export const barsIcon: ComponentStory<typeof BarsIcon> = (args) => (
  <BarsIcon {...args} />
)

export const checkIcon: ComponentStory<typeof CheckIcon> = (args) => (
  <CheckIcon {...args} />
)

export const chevronDownIcon: ComponentStory<typeof ChevronDownIcon> = (
  args
) => <ChevronDownIcon {...args} />

export const chevronLeftIcon: ComponentStory<typeof ChevronLeftIcon> = (
  args
) => <ChevronLeftIcon {...args} />

export const ellipsisIcon: ComponentStory<typeof EllipsisIcon> = (args) => (
  <EllipsisIcon {...args} />
)

export const exclamationIcon: ComponentStory<typeof ExclamationIcon> = (
  args
) => <ExclamationIcon {...args} />

export const plusIcon: ComponentStory<typeof PlusIcon> = (args) => (
  <PlusIcon {...args} />
)

export const xIcon: ComponentStory<typeof XIcon> = (args) => <XIcon {...args} />
