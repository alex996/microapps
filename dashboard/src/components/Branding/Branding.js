import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Grid, Typography } from '@material-ui/core'
import { Timer } from '@material-ui/icons'

const Square = styled.div`
  display: flex;
  ${({ theme: { palette, spacing, shape } }) => `
    background: ${palette.tertiary.main};
    color: ${palette.common.white};
    padding: ${spacing(0.5)}px;
    border-radius: ${shape.borderRadius}px;
  `}
`

const Branding = ({ icon, title }) => (
  <Grid spacing={1} alignItems='center' container>
    <Grid item>
      <Square>{icon}</Square>
    </Grid>
    <Grid item>
      <Typography color='inherit' variant='h5'>
        {title}
      </Typography>
    </Grid>
  </Grid>
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
