import React from 'react'
import PropTypes from 'prop-types'

const ActionBar = ({ onFileChange }) => (
  <div className='action-bar'>
    <span>PDF Viewer</span>

    <div className='file is-small'>
      <label className='file-label'>
        <input className='file-input' type='file' onChange={onFileChange} />
        <span className='file-cta'>
          <span className='file-label'>
            Upload
          </span>
        </span>
      </label>
    </div>
  </div>
)

ActionBar.propTypes = {
  onFileChange: PropTypes.func
}

ActionBar.defaultProps = {
  onFileChange: f => f
}

export default ActionBar
