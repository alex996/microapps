import React from 'react'
import PropTypes from 'prop-types'

const ActionBar = ({ onFileChange }) => (
  <div className='action-bar'>
    <span className='branding'>PDF Viewer</span>

    <div className='zoom-buttons'>
      <button>-</button>
      <button>+</button>
    </div>

    <label className='file'>
      <input type='file' onChange={onFileChange} />
      <span>Upload</span>
    </label>
  </div>
)

ActionBar.propTypes = {
  onFileChange: PropTypes.func
}

ActionBar.defaultProps = {
  onFileChange: f => f
}

export default ActionBar
