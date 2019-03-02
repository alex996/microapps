import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

// const pdfUrl = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
const pdf = '../../static/documents.pdf'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

const renderPage = (_, index) => (
  <Page
    key={index}
    className='pdf-page'
    pageNumber={index + 1}
  />
)

const PdfViewer = props => {
  const [pages, setPages] = useState([])

  const handlePdfLoad = pdf => {
    const promises = Array
      .from({ length: pdf.numPages }, (_, index) => index + 1) // [1,2,3,...N]
      .map(pageNumber => pdf.getPage(pageNumber)) // [PDFPageProxy,...]

    Promise.all(promises).then(pdfPages => {
      const pages = pdfPages.map(page => ({ height: page.height }))

      setPages(pages)
    })
  }

  return (
    <Document
      file={pdf}
      className='pdf-viewer'
      options={options}
      onLoadSuccess={handlePdfLoad}
      renderMode='svg'
    >
      {pages.map(renderPage)}
    </Document>
  )
}

export default PdfViewer
