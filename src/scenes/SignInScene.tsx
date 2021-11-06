import { ReactEventHandler, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { routes } from '../App'
import { appDispatch, signIn, selectError } from '../store'
import { Button, ColumnLayout, Form, FormHeader, Input, VStack } from '../views'

const SignInScene = () => {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const error = useSelector(selectError)

  const handleSumbit: ReactEventHandler = (event) => {
    event.preventDefault()

    appDispatch(signIn({ email, password }))
  }

  return (
    <ColumnLayout>
      <div className="text--trailing">
        <Link to={routes.createAccount}>Create Account</Link>
      </div>
      <FormHeader>
        <h1>Sign Into Your Account</h1>
        <p>
          Welcome back to Notes. Enter your information to access your account.
        </p>
      </FormHeader>
      <Form
        checkForValidityOn={[email, password]}
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
          <div>
            <Input
              label="Password"
              type="password"
              isRequired
              value={password}
              onChange={setPassword}
            />
            <Link to={routes.forgotPassword}>Forgot password?</Link>
          </div>
          <Button type={isValid ? 'primary' : 'disabled'}>Sign In</Button>
        </VStack>
      </Form>
      <p className="text--light text--s">
        This is a demo app. If you would like your account deleted, please send
        a note to zeke@binion.io.
      </p>
    </ColumnLayout>
  )
}

export default connect()(SignInScene)
