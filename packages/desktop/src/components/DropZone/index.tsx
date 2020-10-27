import React, { useCallback, useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import WebViewer from '@pdftron/webviewer'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { Container, P, WebViewerCSSVariables } from './styles'

interface Props{
  text?: string;
  accept?: string | string[];
  onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploaded, text, accept }) => {
  const webViewerRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [selectedFileUrl, setSelectedFileUrl] = useState<File | null>(null)

  useEffect(() => {
    if (selectedFileUrl) {
      SetNewEbook(selectedFileUrl)
    }
  }, [selectedFileUrl])

  const SetNewEbook = (Ebook: File) => {
    const webViewer = webViewerRef.current
    if (!webViewer) return

    if (webViewer.childNodes[0]) webViewer.removeChild(webViewer.childNodes[0])

    const NewInstance = document.createElement('div')

    WebViewer(
      {
        path: '/webviewer/lib'
      },
      NewInstance
    ).then((instance) => {
      instance.loadDocument(Ebook, { filename: 'preview.pdf' })

      const { setTheme, iframeWindow, disableElements } = instance
      const iframeDoc = iframeWindow.document
      const Body = iframeDoc.querySelector('body')

      disableElements(['header'])
      disableElements(['toolsHeader'])

      setTheme('dark')
      // setTheme({ primary: 'blue', secondary: 'white' });
      if (Body) {
        Body.style = WebViewerCSSVariables(theme)
      }
    })

    webViewer.appendChild(NewInstance)
  }

  const onDrop = useCallback(acceptedFiles => {
    // Como so terá um arquivo, a imagem sempre estará na pos 0
    const file = acceptedFiles[0] as File

    const fileUrl = URL.createObjectURL(file)
    console.log(fileUrl)
    setSelectedFileUrl(file)
    // setSelectedFileUrl(fileUrl)
    onFileUploaded(file)
  }, [onFileUploaded])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  })

  return (
    <Container {...getRootProps()} >
      <input {...getInputProps()} />

      {selectedFileUrl
        ? <div ref={webViewerRef} className="webViewer"></div>
        : (
          <P>
            <FiUpload />
            {text}
          </P>
        )
      }

    </Container>
  )
}

export default DropZone
