import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { AnimatePresence } from 'framer-motion'

import {
  appDispatch,
  destroyCurrentUser,
  fetchNotes,
  selectCurrentUser,
  setCurrentUser,
} from './store'
import { auth } from './services/firebase'
import CreateAccountScene from './scenes/CreateAccountScene'
import NotesScene from './scenes/NotesScene'
import SignInScene from './scenes/SignInScene'
import ForgotPasswordScene from './scenes/ForgotPasswordScene'

export const routes = {
  createAccount: '/',
  forgotPassword: '/forgot-password',
  notes: '/notes',
  signIn: '/sign-in',
}

const App = () => {
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        appDispatch(
          setCurrentUser({
            name: user.displayName!,
            id: user.uid,
            email: user.email!,
          })
        )
        appDispatch(fetchNotes(user.uid))
      } else {
        appDispatch(destroyCurrentUser())
      }
    })
  }, [])

  return (
    <AnimatePresence>
      <BrowserRouter>
        <Switch>
          <Route path={routes.notes}>
            {currentUser ? (
              <NotesScene />
            ) : (
              <Redirect to={routes.createAccount} />
            )}
          </Route>
          <Route path={routes.forgotPassword}>
            {currentUser ? (
              <Redirect to={routes.notes} />
            ) : (
              <ForgotPasswordScene />
            )}
          </Route>
          <Route path={routes.signIn}>
            {currentUser ? <Redirect to={routes.notes} /> : <SignInScene />}
          </Route>
          <Route path={routes.createAccount}>
            {currentUser ? (
              <Redirect to={routes.notes} />
            ) : (
              <CreateAccountScene />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </AnimatePresence>
  )
}

export default App
