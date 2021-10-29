import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'

it('renders without crashing', () => {
  const divEle = document.createElement('div')

  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    divEle
  )
})
