import './style.scss'
import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

const renderPage = (_, index) => (
  <Page
    key={index}
    pageNumber={index + 1}
  />
)

const PdfViewer = props => {
  const [numPages, setNumPages] = useState(0)
  const handlePdfLoad = pdf => setNumPages(pdf.numPages)
  const pages = [...Array(numPages)]

  return (
    <Document
      file={pdfUrl}
      className='viewer'
      options={options}
      onLoadSuccess={handlePdfLoad}
      renderMode='svg'
    >
      {pages.map(renderPage)}
    </Document>
  )
}

export default PdfViewer
