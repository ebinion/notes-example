import ReactDom from 'react-dom'

import App from './App'
import { AppContextProvider } from './AppContext'

it('renders without crashing', () => {
  const divEle = document.createElement('div')

  ReactDom.render(
    <AppContextProvider>
      <App />
    </AppContextProvider>,
    divEle
  )
})
