import { ReactEventHandler, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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

  const handleSumbit: ReactEventHandler = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    // TODO: wire submission to Firebase
  }

  const renderForm = () => {
    return (
      <>
        <div className="text--trailing">
          <Link to="/sign-in">Sign In</Link>
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
          // errorMessage={/* TODO: implement */}
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
          <Link to="/sign-in">Sign Into Your Account</Link>
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
