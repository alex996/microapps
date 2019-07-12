import React from 'react'
import styled from '@emotion/styled'
import { storiesOf } from '@storybook/react'
import { Grid, Paper, Typography } from '@material-ui/core'
import theme from './'

const Color = styled.div`
  background: ${props => props.hex};
  border-radius: ${props => props.theme.shape.borderRadius}px;
  height: 5rem;
  min-width: 10rem;
`

const Caption = styled(Typography)`
  padding: 0.25rem;
`

// eslint-disable-next-line react/prop-types
const ColorDrop = ({ variation, color }) => (
  <Paper>
    <Grid direction="column" justify="center" container>
      <Grid item>
        <Color hex={color} />
      </Grid>
      <Grid item>
        <Caption align="center">
          {variation} / {color}
        </Caption>
      </Grid>
    </Grid>
  </Paper>
)

storiesOf('Styling / theme', module).add('palette', () => (
  <Grid spacing={2} container>
    {['primary', 'secondary', 'tertiary'].map(intention => (
      <Grid key={intention} item>
        <Grid spacing={3} direction="column" container>
          <Grid item>
            <Paper>
              <Typography align="center" variant="button" component="p">
                {intention}
              </Typography>
            </Paper>
          </Grid>
          {Object.entries(theme.palette[intention]).map(
            ([variation, color]) => (
              <Grid key={variation} item>
                <ColorDrop variation={variation} color={color} />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    ))}
  </Grid>
))
