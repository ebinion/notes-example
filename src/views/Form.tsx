import { ReactNode, ReactEventHandler, useEffect, useRef } from 'react'

import Notice from './Notice'
import VStack from './VStack'

const Form = (props: {
  children: ReactNode
  checkForValidityOn: Object[]
  errorMessage?: string | null
  onSubmit: ReactEventHandler
  validityCallback: (isValid: boolean) => any
}) => {
  const {
    children,
    checkForValidityOn,
    errorMessage,
    onSubmit,
    validityCallback,
  } = props
  const formRef = useRef<HTMLFormElement>(null)

  const checkFormValidity = () => {
    if (typeof validityCallback === 'function' && formRef.current)
      validityCallback(formRef.current.checkValidity())
  }

  useEffect(() => {
    checkFormValidity()
  }, checkForValidityOn) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <VStack gap="l">
        {errorMessage && <Notice>{errorMessage}</Notice>}
        {children}
      </VStack>
    </form>
  )
}

Form.defaultProps = {
  checkForValidityOn: [],
}

export default Form
