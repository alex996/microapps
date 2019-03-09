import React from 'react'
import styled from '@emotion/styled'
import { CssBaseline } from '@material-ui/core'

const Container = styled.div`
  background: ${({ theme }) => theme.palette.grey[300]};
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const App = props => (
  <>
    <CssBaseline />
    <Container>App</Container>
  </>
)

export default App
