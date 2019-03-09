import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { jssPreset, CssBaseline } from '@material-ui/core'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import theme from '../src/theme'

const jss = create({ ...jssPreset(), insertionPoint: 'jss-insertion-point' })

addDecorator(story => (
  <JssProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {story()}
    </ThemeProvider>
  </JssProvider>
))

const loadStories = () => {
  const req = require.context('../src/components', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
