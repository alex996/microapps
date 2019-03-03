import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { VariableSizeList as List } from 'react-window'

// const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
const pdf = '../../static/documents.pdf'

const PAGE_MARGIN = 10

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

const getAvgPageHeight = pages => (
  pages.reduce(
    (avgHeight, page) => avgHeight + page.height + PAGE_MARGIN, 0
  ) / pages.length
)

const PdfPage = ({ index, style, data: getPageWidth }) => (
  <div className='pdf-page-container' style={style}>
    <Page
      className='pdf-page'
      pageNumber={index + 1}
      width={getPageWidth(index)}
    />
  </div>
)

const PdfViewer = ({ height }) => {
  const [pages, setPages] = useState([])

  const handlePdfLoad = pdf => {
    const promises = Array
      .from({ length: pdf.numPages }, (_, index) => index + 1) // [1,2,3,...N]
      .map(pageNumber => pdf.getPage(pageNumber)) // [PDFPageProxy,...,N]

    Promise.all(promises).then(pdfPages => {
      const pages = pdfPages.map(page => ({
        height: page.view[3],
        width: page.view[2]
      }))

      setPages(pages)
    })
  }

  const getPageHeight = index => pages[index].height + PAGE_MARGIN

  const getPageWidth = index => Math.min(pages[index].width, window.innerWidth) - PAGE_MARGIN

  return (
    <Document
      file={pdf}
      renderMode='svg'
      options={options}
      onLoadSuccess={handlePdfLoad}
    >
      {pages.length && (
        <List
          width='100%'
          height={height}
          className='pdf-viewer'
          itemCount={pages.length}
          itemSize={getPageHeight}
          estimatedItemSize={getAvgPageHeight(pages)}
          itemData={getPageWidth}
          overscanCount={1}
        >
          {PdfPage}
        </List>
      )}
    </Document>
  )
}

PdfViewer.propTypes = {
  height: PropTypes.number
}

PdfViewer.defaultProps = {
  height: window.innerHeight
}

export default PdfViewer
