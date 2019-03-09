import React from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@material-ui/core'

const Breadcrumbs = props => (
  <MuiBreadcrumbs>
    <Link color='secondary'>
      Apps
    </Link>
    <Link color='secondary'>
      XHC96FPBZE
    </Link>
  </MuiBreadcrumbs>
)

Breadcrumbs.propTypes = {
  ...Breadcrumbs.propTypes
}

export default Breadcrumbs
