import React from 'react'
import PropTypes from 'prop-types'
import { LIGHT } from '../store'

const ThemeSwitch = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme}>
    {theme}
  </button>
)

ThemeSwitch.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func
}

ThemeSwitch.defaultProps = {
  theme: LIGHT,
  toggleTheme: f => f
}

export default ThemeSwitch
