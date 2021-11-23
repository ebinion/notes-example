import { FC, ReactEventHandler, useState } from 'react'
import { connect, DispatchProp, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { routes } from '../App'
import { appDispatch, createUserAndSignIn, selectError } from '../store'
import {
  Button,
  ColumnLayout,
  Form,
  FormHeader,
  Input,
  Motion,
  VStack,
} from '../views'

const CreateAccountScene: FC<DispatchProp> = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const error = useSelector(selectError)

  const handleSubmit: ReactEventHandler = (event) => {
    event.preventDefault()
    appDispatch(
      createUserAndSignIn({
        name,
        email,
        password,
      })
    )
  }

  return (
    <Motion kind="slideFromBottom">
      <ColumnLayout>
        <div className="text--trailing">
          <Link to={routes.signIn}>Sign In</Link>
        </div>
        <FormHeader>
          <h1>Welcome to Notes</h1>
          <p>
            Notes is a simple app that let&rsquo;s you jot down your thoughts
            using markdown.
          </p>
        </FormHeader>
        <Form
          checkForValidityOn={[name, email, password]}
          errorMessage={error}
          onSubmit={handleSubmit}
          validityCallback={setIsFormValid}
        >
          <VStack gap="l">
            <Input
              autoComplete="given-name"
              isRequired
              label="Name"
              onChange={setName}
              placeholder="Zeke"
              value={name}
            />
            <Input
              autoComplete="email"
              isRequired
              label="Email"
              onChange={setEmail}
              placeholder="username@example.com"
              type="email"
              value={email}
            />
            <Input
              autoComplete="new-password"
              isRequired
              label="Password"
              minLength={6}
              onChange={setPassword}
              type="password"
              value={password}
            />
            <Button kind={isFormValid ? 'primary' : 'disabled'}>
              Create Account
            </Button>
          </VStack>
        </Form>
        <p className="text--light text--s">
          This app is intended to be for demonstration purposes only. However,
          it may store sensitive personal information, use at your own risk. If
          you would like your account deleted, please send a note to
          zeke@binion.io.
        </p>
      </ColumnLayout>
    </Motion>
  )
}

export default connect()(CreateAccountScene)
