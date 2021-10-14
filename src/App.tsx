import { useContext } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import NotesScene from './scenes/NotesScene'
import CreateAccountScene from './scenes/CreateAccountScene'
import { AppContext } from './AppContext'

const App = () => {
  const { currentUser } = useContext(AppContext)

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
