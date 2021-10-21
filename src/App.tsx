import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from '@firebase/auth'

import NotesScene from './scenes/NotesScene'
import CreateAccountScene from './scenes/CreateAccountScene'
import {
  destroy as destroyUser,
  selectCurrentUser,
  set as setUser,
} from './store/currentUserStore'
import { AppDispatch } from './store'
import { auth } from './database'

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName!,
            id: user.uid,
            email: user.email!,
          })
        )
      } else {
        dispatch(destroyUser())
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
