import React from 'react'
import { PdfViewer } from '.'

const App = props => (
  <>
    <header>
      PDF Viewer
    </header>
    <main>
      <PdfViewer
        height={window.innerHeight - 50}
      />
    </main>
  </>
)

export default App
