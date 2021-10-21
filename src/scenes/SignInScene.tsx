import { ReactEventHandler, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '../views/Button'
import ColumnLayout from '../views/ColumnLayout'
import Form from '../views/Form'
import FormHeader from '../views/FormHeader'
import Input from '../views/Input'
import VStack from '../views/VStack'

const SignInScene = () => {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSumbit: ReactEventHandler = (event) => {
    event.preventDefault()

    console.log('You submitted stuff')
  }

  return (
    <ColumnLayout>
      <div className="text--trailing">
        <Link to="/">Create Account</Link>
      </div>
      <FormHeader>
        <h1>Sign Into Your Account</h1>
        <p>
          Welcome back to Notes. Enter your information to access your account.
        </p>
      </FormHeader>
      <Form
        checkForValidityOn={[email, password]}
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
          <div>
            <Input
              label="Password"
              type="password"
              isRequired
              value={password}
              onChange={setPassword}
            />
            <Link to="/forgot-password">Forgot password?</Link>
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
