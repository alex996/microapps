import React from 'react'
import styled from '@emotion/styled'
import { Fab } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const Button = styled(Fab)`
  ${({ theme: { palette, spacing } }) => `
    background: ${palette.tertiary.darker};
    color: ${palette.tertiary.light};
    border: ${spacing(0.25)}px solid ${palette.primary.light};

    :hover {
      background: ${palette.tertiary.dark};
    }
  `}
`

const SearchBar = props => (
  <Button size="small" {...props}>
    <Search />
  </Button>
)

export default SearchBar
