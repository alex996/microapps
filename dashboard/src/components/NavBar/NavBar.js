import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core'
import { Branding } from '..'

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.palette.primary.dark};
`

const NavBar = ({ branding, ...other }) => (
  <AppBar position='static' {...other}>
    <Toolbar>
      {branding}
    </Toolbar>
  </AppBar>
)

NavBar.propTypes = {
  ...AppBar.propTypes,
  branding: PropTypes.node
}

NavBar.defaultProps = {
  ...AppBar.defaultProps,
  branding: <Branding />
}

export default NavBar
