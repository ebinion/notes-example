import { FC, ReactNode, ReactEventHandler, useEffect, useRef } from 'react'

import Notice from './Notice'
import VStack from './VStack'

interface FormProps {
  children: ReactNode
  checkForValidityOn: Object[]
  errorMessage: ReactNode
  onSubmit: ReactEventHandler
  validityCallback: Function
}

const Form: FC<FormProps> = ({
  children,
  checkForValidityOn,
  errorMessage,
  onSubmit,
  validityCallback,
}) => {
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
