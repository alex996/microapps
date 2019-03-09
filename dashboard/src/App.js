import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { CssBaseline } from '@material-ui/core'
import { Layout } from './components'
import theme from './theme'

const App = props => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout />
  </ThemeProvider>
)

export default App
