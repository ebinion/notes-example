import { ReactEventHandler, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'

import { routes } from '../App'
import { auth } from '../services/firebase'
import { getAuthErrorMessage } from '../utilities/helpers'
import { appDispatch, destroyError, selectError, setError } from '../store'
import Button from '../views/Button'
import ColumnLayout from '../views/ColumnLayout'
import Form from '../views/Form'
import FormHeader from '../views/FormHeader'
import Input from '../views/Input'
import VStack from '../views/VStack'

const ForgotPasswordScene = () => {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const error = useSelector(selectError)

  const handleSumbit: ReactEventHandler = (event) => {
    event.preventDefault()
    appDispatch(destroyError())

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsSubmitted(true)
      })
      .catch((error) => {
        appDispatch(setError(getAuthErrorMessage(error)))
      })
  }

  const renderForm = () => {
    return (
      <>
        <div className="text--trailing">
          <Link to={routes.signIn}>Sign In</Link>
        </div>
        <FormHeader>
          <h1>Forgot your password?</h1>
          <p>
            No worries. Enter your email and we’ll send you instructions to
            reset your password.
          </p>
        </FormHeader>
        <Form
          checkForValidityOn={[email]}
          errorMessage={error}
          validityCallback={setIsValid}
          onSubmit={handleSumbit}
        >
          <VStack gap="l">
            <Input
              label="Email"
              type="email"
              isRequired
              value={email}
              onChange={setEmail}
            />
            <Button type={isValid ? 'primary' : 'disabled'}>Send Email</Button>
          </VStack>
        </Form>
      </>
    )
  }

  const renderSubmitted = () => {
    return (
      <>
        <FormHeader>
          <h1>Check Your Inbox</h1>
        </FormHeader>
        <p>
          If the email address you submitted matches our records, you will
          recieve an email in your inbox from
          "noreply@notes-7533e.firebaseapp.com ". Please follow the instructions
          provided to create a new password.
        </p>
        <p>
          <Link to={routes.signIn}>Sign Into Your Account</Link>
        </p>
      </>
    )
  }

  return (
    <ColumnLayout>
      {isSubmitted ? renderSubmitted() : renderForm()}
    </ColumnLayout>
  )
}

export default connect()(ForgotPasswordScene)
