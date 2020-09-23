import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webViewer'

import { Container } from './styles'

const Read: React.FC = () => {
  const webViewerRef = useRef(null)

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
      const { docViewer, Annotations, setTheme } = instance
      const annotManager = docViewer.getAnnotationManager()

      setTheme('dark')

      docViewer.on('documentLoaded', () => {
        // const rectangleAnnot = new Annotations.RectangleAnnotation()
        // rectangleAnnot.PageNumber = 1
        // // values are in page coordinates with (0, 0) in the top left
        // rectangleAnnot.X = 100
        // rectangleAnnot.Y = 150
        // rectangleAnnot.Width = 200
        // rectangleAnnot.Height = 50
        // rectangleAnnot.Author = annotManager.getCurrentUser()

        // annotManager.addAnnotation(rectangleAnnot)
        // // need to draw the annotation otherwise it won't show up until the page is refreshed
        // annotManager.redrawAnnotation(rectangleAnnot)
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
