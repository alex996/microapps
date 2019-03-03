import React, { useState, useRef, useEffect } from 'react'
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

const PdfViewer = ({ file, scale, height, width }) => {
  const [pages, setPages] = useState([])

  const list = useRef()
  const scroller = useRef()

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

  const getPageHeight = index => pages[index].height * scale

  useEffect(() => {
    if (pages.length) {
      setPages([])
    }
  }, [file])

  useEffect(() => {
    if (list.current && scroller.current) {
      list.current.resetAfterIndex(0) // re-render

      const widestPage = pages.reduce(
        (prevPage, page) => prevPage.width > page.width ? prevPage : page
      )

      // With vertical lists, react-window only updates the height. We
      // need to also update the width, so the page doesn't get cut off.
      scroller.current.style.width = `${widestPage.width * scale}px`
    }
  }, [scale])

  return (
    <Document
      file={file}
      renderMode='svg'
      options={options}
      className='has-text-centered'
      onLoadSuccess={handlePdfLoad}
    >
      {!!pages.length && (
        <List
          ref={list}
          width='100%'
          className='pdf-viewer'
          innerRef={scroller}
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
  scale: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number
}

PdfViewer.defaultProps = {
  file: '',
  scale: 1,
  height: window.innerHeight,
  width: window.innerWidth
}

export default PdfViewer
