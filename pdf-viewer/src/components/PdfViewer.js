import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'react-pdf/dist/entry.webpack'
import { VariableSizeList as List } from 'react-window'
import { PdfPage } from '.'

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

const PdfViewer = ({ file, height, width }) => {
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
      file={file}
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
  file: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
  height: PropTypes.number,
  width: PropTypes.number
}

PdfViewer.defaultProps = {
  file: '',
  height: window.innerHeight,
  width: window.innerWidth
}

export default PdfViewer
