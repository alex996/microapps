import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { CssBaseline } from '@material-ui/core'
import { App } from './components'
import theme from './theme'

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('app')
)
