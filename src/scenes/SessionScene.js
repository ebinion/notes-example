import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from '@firebase/auth'

import { auth } from '../database'

import { getAuthErrorMessage } from '../helpers'
import Button from '../views/Button'
import ColumnLayout from '../views/ColumnLayout'
import Input from '../views/Input'
import Form from '../views/Form'
import VStack from '../views/VStack'

const SessionScene = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [isFormValid, setIsFormValid] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        updateProfile(userCredential.user, {
          displayName: name,
        })
      })
      .catch(error => {
        setErrorMessage(getAuthErrorMessage(error.code))
      })
  }

  onAuthStateChanged(auth, user => {
    // console.log('currentUser', auth.currentUser)
  })

  return (
    <ColumnLayout>
      <h1>Welcome to Notes</h1>
      <p>
        Notes is a simple app that let&rsquo;s you jot down your thoughts using
        markdown.
      </p>
      <Form
        checkForValidityOn={[name, email, password]}
        errorMessage={errorMessage}
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
          <Button type={isFormValid ? 'primary' : 'disabled'}>
            Create Account
          </Button>
        </VStack>
      </Form>
      <p className="text--light text--s">
        This app is intended to be for demonstration purposes only. However, it
        may store sensitive personal information, use at your own risk. If you
        would like your account deleted, please send a note to zeke@binion.io.
      </p>
    </ColumnLayout>
  )
}

export default SessionScene
