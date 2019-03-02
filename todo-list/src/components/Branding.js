import React from 'react'
import PropTypes from 'prop-types'

const Branding = ({ title }) => (
  <h1>{title}</h1>
)

Branding.propType = {
  title: PropTypes.string
}

Branding.defaultProps = {
  title: 'Todos'
}

export default Branding
