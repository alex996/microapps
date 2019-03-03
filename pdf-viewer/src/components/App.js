import React, { useState } from 'react'
import { ActionBar, PdfViewer } from '.'

const demoPdf = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'

const App = props => {
  const [file, setFile] = useState(demoPdf)

  const handleFileChange = e => setFile(e.target.files[0])

  return (
    <>
      <header>
        <ActionBar onFileChange={handleFileChange} />
      </header>
      <main>
        <PdfViewer
          file={file}
          height={window.innerHeight - 43}
          width={window.innerWidth}
        />
      </main>
    </>
  )
}

export default App
