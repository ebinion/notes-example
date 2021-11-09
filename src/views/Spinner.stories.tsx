import { Meta } from '@storybook/react'
import Spinner from './Spinner'

export default {
  title: 'Views/Spinner',
  component: Spinner,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta

export const spinner = () => <Spinner />
