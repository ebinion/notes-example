import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Notice from './Notice'
import VStack from './VStack'

const Form = ({
  children,
  checkForValidityOn,
  errorMessage,
  onSubmit,
  validityCallback,
}) => {
  const formRef = useRef()

  const checkFormValidity = () => {
    if (typeof validityCallback === 'function')
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

Form.propTypes = {
  children: PropTypes.node,
  checkForValidityOn: PropTypes.array.isRequired,
  errorMessage: PropTypes.node,
  onSubmit: PropTypes.func,
  validityCallback: PropTypes.func,
}

Form.defaultProps = {
  checkForValidityOn: [],
}

export default Form
