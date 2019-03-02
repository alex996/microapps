import React from 'react'
import { render } from 'react-dom'
import { Provider } from './redux'
import { App } from './components'
import { app } from './store'

render(
  <Provider reducer={app}>
    <App />
  </Provider>,
  document.getElementById('app')
)
