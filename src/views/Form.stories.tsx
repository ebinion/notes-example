import { useState } from 'react'
import { Meta } from '@storybook/react'

import FormComponent from './Form'
import Input from './Input'
import Button from './Button'

export default {
  title: 'Views/Form',
  component: FormComponent,
} as Meta

export const Form = () => {
  const [example, setExample] = useState('')
  const [isValid, setIsValid] = useState(false)

  return (
    <FormComponent
      checkForValidityOn={[example]}
      validityCallback={setIsValid}
      onSubmit={(event) => {
        event.preventDefault()
        alert(`Example value is "${example}"`)
      }}
    >
      <Input label="Example" value={example} onChange={setExample} isRequired />
      <Button type={isValid ? 'primary' : 'disabled'}>Submit</Button>
    </FormComponent>
  )
}

Form.parameters = {
  controls: { hideNoControlsWarning: true },
}
