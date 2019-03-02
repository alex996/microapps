import React from 'react'
import PropTypes from 'prop-types'
import { Debugger } from '../components'
import { initialState } from '../store'
import { connect } from '../redux'

const Footer = ({ state }) => (
  <footer>
    <Debugger state={state} />
  </footer>
)

Footer.propTypes = {
  state: PropTypes.shape({
    theme: PropTypes.string,
    locale: PropTypes.string,
    todos: PropTypes.arrayOf(PropTypes.object)
  })
}

Footer.defaultProps = {
  state: initialState
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(Footer)
