import React from 'react'
import { storiesOf } from '@storybook/react'
import NavBar from './'

storiesOf('NavBar', module)
  .add('default', () => (
    <NavBar />
  ))
