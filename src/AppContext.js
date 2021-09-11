import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({
  notes: [],
  isNavOpen: false,
  toggleIsNavOpen: () => {},
})

const AppContextProvider = props => {
  const [notes, setNotes] = useState([])
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleIsNavOpen = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <AppContext.Provider
      value={{
        notes: notes,
        isNavOpen: isNavOpen,
        toggleIsNavOpen: toggleIsNavOpen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
AppContextProvider.propTypes = {
  children: PropTypes.node,
}

export { AppContext, AppContextProvider }
