import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core'

const Branding = props => (
  <Typography color='inherit' {...props} />
)

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.palette.primary.dark};
`

const NavBar = ({ branding, ...native }) => (
  <AppBar position='static' {...native}>
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
  branding: <Branding>algolia</Branding>
}

export default NavBar
