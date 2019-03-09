import React from 'react'
import { storiesOf } from '@storybook/react'
import App from './'

storiesOf('Components / App', module)
  .add('default', () => (
    <App />
  ))
