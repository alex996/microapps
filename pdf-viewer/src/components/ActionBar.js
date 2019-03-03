import React from 'react'
import PropTypes from 'prop-types'

const ActionBar = ({ onZoomIn, onZoomOut, onFileChange }) => (
  <div className='action-bar'>
    <span>PDF Viewer</span>

    <div className='field is-grouped is-marginless'>
      <p className='control'>
        <button className='button is-small has-text-weight-bold' onClick={onZoomOut}>
          −
        </button>
      </p>
      <p className='control'>
        <button className='button is-small has-text-weight-bold' onClick={onZoomIn}>
          +
        </button>
      </p>
    </div>

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
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onFileChange: PropTypes.func
}

ActionBar.defaultProps = {
  onZoomIn: f => f,
  onZoomOut: f => f,
  onFileChange: f => f
}

export default ActionBar
