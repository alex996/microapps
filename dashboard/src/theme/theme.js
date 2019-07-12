import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#29045e',
      dark: '#130833'
    },
    secondary: {
      main: '#ff007d'
    },
    tertiary: {
      main: '#2170c8',
      light: '#1ba0ff',
      dark: '#18233c',
      darker: '#121b2a'
    }
  }
})

export default theme
