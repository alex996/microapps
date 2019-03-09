import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { CssBaseline } from '@material-ui/core'
import theme from '../src/theme'

const loadStories = () => {
  const req = require.context('../src/components', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {story()}
  </ThemeProvider>
))

configure(loadStories, module)
