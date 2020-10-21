/* eslint-disable camelcase */

import React, { useRef, useEffect, useContext } from 'react'
import WebViewer from '@pdftron/webviewer'

import { ThemeContext } from 'styled-components'
import { Container, WebViewerCSSVariables } from './styles'
import api from '@thoth/axios-config'

interface EbookProps {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  url: string;
  thumbnail: string;
  edition: number;
  albums_id: number;
  albumName:string;
  author_id: number;
  authorName: string;
  authorAvatar: string;
}

interface Props {
  location: {
    ebook: EbookProps
  }
}
const Read: React.FC<Props> = (props) => {
  const webViewerRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const Ebook = props.location.ebook

  useEffect(() => {
    const webViewer = webViewerRef.current

    if (!webViewer && !Ebook) return

    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: Ebook.url
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
        console.log('loaded')
      })
      iframeWindow.addEventListener('loaderror', (err) => {
        // Do something with error. eg. instance.showErrorMessage('An error has occurred')
        // alert(err)
        console.log(err)
      })

      docViewer.on('pageNumberUpdated', (pageNumber) => {
        // here it's guaranteed that page {pageNumber} is fully rendered
        // you can get or set pixels on the canvas, etc
        const totalPage = docViewer.getPageCount()
        const percentage = Math.floor((pageNumber * 100) / totalPage)

        // console.log(percentage, pageNumber, totalPage)

        api.post('/readingList', {
          ebookId: Ebook.id,
          percentage: `${pageNumber}/${totalPage}`
        })
      })
    })

    // return () => { WebViewer.length = 0 }
  }, [])

  return (
    <Container>
      <div ref={webViewerRef} className="webViewer"></div>
    </Container>
  )
}

export default Read
