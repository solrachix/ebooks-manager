import React, { useRef, useEffect, useContext } from 'react'
import WebViewer from '@pdftron/webviewer'

import { ThemeContext } from 'styled-components'
import { Container, WebViewerCSSVariables } from './styles'

const Read: React.FC = () => {
  const webViewerRef = useRef(null)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    const webViewer = webViewerRef.current

    if (!webViewer) return

    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'http://localhost:3333/uploads/o.pdf'
      },
      webViewer
    ).then((instance) => {
      const { docViewer, setTheme, iframeWindow, setLanguage } = instance
      const iframeDoc = iframeWindow.document
      const Body = iframeDoc.querySelector('body')

      setLanguage('pt_br')
      setTheme('dark')
      // setTheme({ primary: 'blue', secondary: 'white' });
      if (Body) {
        Body.style = WebViewerCSSVariables(theme)
      }

      docViewer.on('documentLoaded', () => {

      })
      iframeWindow.addEventListener('loaderror', (err) => {
        // Do something with error. eg. instance.showErrorMessage('An error has occurred')
        alert(err)
      })

      docViewer.on('pageNumberUpdated', (pageNumber) => {
        // here it's guaranteed that page {pageNumber} is fully rendered
        // you can get or set pixels on the canvas, etc
        const totalPage = docViewer.getPageCount()
        const percentage = Math.floor((pageNumber * 100) / totalPage)

        console.log(percentage, pageNumber, totalPage)
      })
    })
  }, [])

  return (
    <Container>
      <div ref={webViewerRef} className="webViewer"></div>
    </Container>
  )
}

export default Read
