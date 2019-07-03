import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import createAppStore from './store'
import { PersistGate } from 'redux-persist/es/integration/react'

const { persistor, store } = createAppStore()


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
document.getElementById('root'))
