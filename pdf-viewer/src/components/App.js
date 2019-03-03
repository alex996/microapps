import React, { useState } from 'react'
import { ActionBar, PdfViewer } from '.'

const demoPdf = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'

const MAX_SCALE = 4
const BASE_SCALE = 1.25
const ZOOM_STEP = 0.25

const App = props => {
  const [file, setFile] = useState(demoPdf)
  const [scale, setScale] = useState(BASE_SCALE)

  const handleFileChange = e => {
    setFile(e.target.files[0])

    if (scale !== BASE_SCALE) {
      setScale(BASE_SCALE)
    }
  }

  const onZoomIn = () => {
    if (scale < MAX_SCALE) {
      setScale(scale + ZOOM_STEP)
    }
  }

  const onZoomOut = () => {
    if (scale > ZOOM_STEP) {
      setScale(scale - ZOOM_STEP)
    }
  }

  return (
    <>
      <header>
        <ActionBar
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onFileChange={handleFileChange}
        />
      </header>
      <main>
        <PdfViewer
          file={file}
          scale={scale}
          height={window.innerHeight - 43}
          width={window.innerWidth}
        />
      </main>
    </>
  )
}

export default App
