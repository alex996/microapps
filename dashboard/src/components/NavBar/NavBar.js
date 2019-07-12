import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { AppBar as MuiAppBar, Toolbar, Grid } from '@material-ui/core'
import { Branding, Breadcrumbs, SearchBar } from '..'

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.palette.primary.dark};
`

const Stretched = styled(Grid)`
  flex-grow: 1;
  text-align: right;
`

const NavBar = ({ branding, breadcrumbs, searchBar, ...other }) => (
  <AppBar position="static" {...other}>
    <Toolbar>
      <Grid spacing={2} alignItems="center" container>
        <Grid item>{branding}</Grid>
        <Grid item>{breadcrumbs}</Grid>
        <Stretched item>{searchBar}</Stretched>
      </Grid>
    </Toolbar>
  </AppBar>
)

NavBar.propTypes = {
  ...AppBar.propTypes,
  branding: PropTypes.node,
  breadcrumbs: PropTypes.node,
  searchBar: PropTypes.node
}

NavBar.defaultProps = {
  ...AppBar.defaultProps,
  branding: <Branding />,
  breadcrumbs: <Breadcrumbs />,
  searchBar: <SearchBar />
}

export default NavBar
