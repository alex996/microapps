import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography as MuiTypography
} from '@material-ui/core'
import { Layers, Share, NavigateNext, ArrowDropDown } from '@material-ui/icons'

const Separator = styled(NavigateNext)`
  margin: 0 -${props => props.theme.spacing(1)}px;
`

const Icon = styled(({ as: Icon, ...other }) => <Icon {...other} />)`
  color: ${props => props.theme.palette.tertiary.main};
`

const Link = styled(MuiLink)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.common.white};
`

const Typography = styled(MuiTypography)`
  margin-left: ${props => props.theme.spacing(0.5)}px;
`

const Breadcrumbs = ({ links, ...other }) => (
  <MuiBreadcrumbs
    separator={<Separator color="secondary" fontSize="large" />}
    {...other}
  >
    {links.map(
      ({ href = '#', icon, text, color = 'inherit', options }, index) => (
        <Link key={index} href={href} underline="none">
          <Icon as={icon} />
          <Typography color={color} variant="button">
            {text}
          </Typography>
          {options && <Icon as={ArrowDropDown} />}
        </Link>
      )
    )}
  </MuiBreadcrumbs>
)

Breadcrumbs.propTypes = {
  links: PropTypes.array
}

Breadcrumbs.defaultProps = {
  links: [
    {
      icon: Layers,
      text: 'Apps'
    },
    {
      icon: Share,
      text: 'XHC96FPBZE',
      options: []
    }
  ]
}

export default Breadcrumbs
