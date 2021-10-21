import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from '@firebase/auth'

import {
  destroyCurrentUser,
  selectCurrentUser,
  setCurrentUser,
  appDispatch,
} from './store'
import { auth } from './database'
import CreateAccountScene from './scenes/CreateAccountScene'
import NotesScene from './scenes/NotesScene'
import SignInScene from './scenes/SignInScene'
import ForgotPasswordScene from './scenes/ForgotPasswordScene'

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
      } else {
        appDispatch(destroyCurrentUser())
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/notes">
          {currentUser ? <NotesScene /> : <Redirect to="/" />}
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordScene />
        </Route>
        <Route path="/sign-in">
          <SignInScene />
        </Route>
        <Route path="/">
          {currentUser ? <Redirect to="/notes" /> : <CreateAccountScene />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
