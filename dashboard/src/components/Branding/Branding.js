import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Typography as MuiTypography } from '@material-ui/core'
import { Timer } from '@material-ui/icons'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Square = styled.span`
  display: flex;
  ${({ theme: { palette, spacing, shape } }) => `
    background: ${palette.tertiary.main};
    color: ${palette.common.white};
    padding: ${spacing(0.5)}px;
    margin-right: ${spacing(1)}px;
    border-radius: ${shape.borderRadius}px;
  `}
`

const Typography = styled(MuiTypography)`
  font-weight: 500;
`

const Branding = ({ icon, title }) => (
  <Container>
    <Square>{icon}</Square>
    <Typography color="inherit" variant="h4">
      {title}
    </Typography>
  </Container>
)

Branding.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string
}

Branding.defaultProps = {
  icon: <Timer />,
  title: 'algolia'
}

export default Branding
