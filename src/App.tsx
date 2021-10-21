import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from '@firebase/auth'

import NotesScene from './scenes/NotesScene'
import CreateAccountScene from './scenes/CreateAccountScene'
import {
  destroyCurrentUser,
  selectCurrentUser,
  setCurrentUser,
  appDispatch,
} from './store'
import { auth } from './database'

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
      <Route path="/notes">
        {currentUser ? <NotesScene /> : <Redirect to="/" />}
      </Route>
      <Route path="/">
        {currentUser ? <Redirect to="/notes" /> : <CreateAccountScene />}
      </Route>
    </BrowserRouter>
  )
}

export default App
