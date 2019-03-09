import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink, Typography
} from '@material-ui/core'
import { Layers, Share, NavigateNext } from '@material-ui/icons'

const Separator = styled(NavigateNext)`
  margin: 0 -${props => props.theme.spacing(1)}px;
`

const Icon = styled(({ icon: Icon, ...other }) => <Icon {...other} />)`
  ${({ theme: { palette, spacing } }) => `
    color: ${palette.tertiary.main};
    margin-right: ${spacing(0.5)}px;
  `}
`

const Link = styled(MuiLink)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.common.white}
`

const Breadcrumbs = ({ links, ...other }) => (
  <MuiBreadcrumbs separator={<Separator color='secondary' fontSize='large' />} {...other}>
    {links.map(({ href = '#', icon, text, color = 'inherit' }, index) => (
      <Link key={index} href={href} underline='none'>
        <Icon icon={icon} />
        <Typography color={color} variant='button'>{text}</Typography>
      </Link>
    ))}
  </MuiBreadcrumbs>
)

Breadcrumbs.propTypes = {
  ...Breadcrumbs.propTypes,
  links: PropTypes.array
}

Breadcrumbs.defaultProps = {
  ...Breadcrumbs.defaultProps,
  links: [
    {
      icon: Layers,
      text: 'Apps'
    },
    {
      icon: Share,
      text: 'XHC96FPBZE'
    }
  ]
}

export default Breadcrumbs
