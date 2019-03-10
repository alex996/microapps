import React from 'react'
import { storiesOf } from '@storybook/react'
import Breadcrumbs from './'

const links = Breadcrumbs.defaultProps.links.map(link => ({
  ...link,
  color: 'default'
}))

storiesOf('Components / Breadcrumbs', module).add('default', () => (
  <Breadcrumbs links={links} />
))
