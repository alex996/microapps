import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'react-pdf/dist/entry.webpack'
import { VariableSizeList as List } from 'react-window'
import PdfPage from './PdfPage'

// const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
const pdfUrl = '../../static/documents.pdf'

const PAGE_MARGIN = 20

const data = { margin: PAGE_MARGIN }

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

const getAvgPageHeight = pages => (
  pages.reduce(
    (avgHeight, page) => avgHeight + page.height + PAGE_MARGIN, 0
  ) / pages.length
)

const PdfViewer = ({ height, width }) => {
  const [pages, setPages] = useState([])

  const handlePdfLoad = pdf => {
    const promises = Array
      .from({ length: pdf.numPages }, (_, index) => index + 1) // [1,2,3,...N]
      .map(pageNumber => pdf.getPage(pageNumber)) // [PDFPageProxy,...,N]

    Promise.all(promises).then(pdfPages => {
      const pages = pdfPages.map(page => {
        const [, , actualWidth, actualHeight] = page.view

        const adjustedWidth = Math.min(actualWidth, width)
        const ratio = adjustedWidth / actualWidth
        const adjustedHeight = actualHeight * ratio

        return {
          height: adjustedHeight,
          width: adjustedWidth
        }
      })

      setPages(pages)
    })
  }

  const getPageHeight = index => pages[index].height

  return (
    <Document
      file={pdfUrl}
      renderMode='svg'
      options={options}
      className='pdf-viewer'
      onLoadSuccess={handlePdfLoad}
    >
      {pages.length && (
        <List
          width='100%'
          height={height}
          itemData={data}
          itemCount={pages.length}
          itemSize={getPageHeight}
          estimatedItemSize={getAvgPageHeight(pages)}
          overscanCount={1}
        >
          {PdfPage}
        </List>
      )}
    </Document>
  )
}

PdfViewer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

PdfViewer.defaultProps = {
  height: window.innerHeight,
  width: window.innerWidth
}

export default PdfViewer
