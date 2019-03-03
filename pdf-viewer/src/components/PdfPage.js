import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Page } from 'react-pdf/dist/entry.webpack'

const PdfPage = ({ index, style, data: { margin } }) => (
  <div className='pdf-page-container' style={style}>
    <Page
      className='pdf-page'
      pageNumber={index + 1}
      height={style.height - margin}
    />
  </div>
)

PdfPage.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.shape({
    margin: PropTypes.number
  }).isRequired
}

PdfPage.defaultProps = {
  index: 0,
  style: {},
  data: {
    margin: 0
  }
}

export default memo(PdfPage)
