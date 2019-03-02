import React from 'react'
import PropTypes from 'prop-types'
import { initialState } from '../store'

const Debugger = ({ state }) => (
  <pre>
    {JSON.stringify(state, null, 4)}
  </pre>
)

Debugger.propTypes = {
  state: PropTypes.shape({
    theme: PropTypes.string,
    locale: PropTypes.string,
    todos: PropTypes.arrayOf(PropTypes.object)
  })
}

Debugger.defaultProps = {
  state: initialState
}

export default Debugger
