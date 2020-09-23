import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'

import { Container } from './styles'

const Read: React.FC = () => {
  const viewerRef = useRef(null)

  useEffect(() => {
    const webviewer = viewerRef.current

    if (!webviewer) return

    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'https://3000-b06ccf80-358e-436e-8482-54721b21f339.ws-us02.gitpod.io/files/PDFTRON_about.pdf'
      },
      webviewer
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
      <div ref={viewerRef} className="webviewer"></div>
    </Container>
  )
}

export default Read
