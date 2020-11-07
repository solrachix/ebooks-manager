/* eslint-disable camelcase */

import React, { useRef, useEffect, useContext, useState } from 'react'
import WebViewer from '@pdftron/webviewer'

import { ThemeContext } from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io'
import HorizontalList from '../../components/HorizontalList'
import { Container, WebViewerCSSVariables, SideBar, Ebook } from './styles'
import api from '@thoth/axios-config'

interface EbookProps {
  id: number;
  title: string;
  description: string;
  numberOfPages: number;
  percentage: string;
  readingTime: string;
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
    ebook: EbookProps | null
  }
}
const Read: React.FC<Props> = (props) => {
  const webViewerRef = useRef<HTMLDivElement>(null)
  const SideBarRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [ebooks, setEbooks] = useState<EbookProps[] | null>(null)
  const [readingBook, setReadingBooks] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    api.get<EbookProps[]>('/readingList').then(response => {
      let newEbooks: EbookProps[]
      const ebookForParams = props.location.ebook

      if (ebookForParams) {
        console.log(ebookForParams)
        newEbooks = response.data.filter(ebook => {
          if (ebook.title === ebookForParams.title) {
            ebookForParams.percentage = ebook.percentage
            ebookForParams.numberOfPages = ebook.numberOfPages
          } else {
            return ebook
          }
        })
        newEbooks.unshift(ebookForParams)
        console.log(newEbooks)
      } else newEbooks = response.data

      setEbooks(newEbooks)
      SetNewEbook(newEbooks[0])
    }).catch(err => console.log(err))

    // return () => { WebViewer.length = 0 }
  }, [])

  useEffect(() => {
    const SideBar = SideBarRef.current
    const Puller = $('.puller > svg')

    if (!SideBar) return
    if (!Puller) return

    if (showSidebar) {
      Puller.animate({
        transform: ['rotateY(0deg)', 'rotateY(180deg)']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      })

      SideBar.animate({
        right: ['-60%', '0%']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      }).addEventListener('finish', () => {
        // alert('a')
        SideBar.style.right = '0%'
      })

      Puller.style.transform = 'rotateY(180deg)'
    } else {
      Puller.animate({
        transform: ['rotateY(180deg)', 'rotateY(0deg)']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      })

      SideBar.animate({
        right: ['0%', '-60%']
      }, {
        duration: 600,
        easing: 'ease-out',
        iterations: 1
      }).addEventListener('finish', () => {
        // alert('a')

        SideBar.style.right = '-60%'
      })

      Puller.style.transform = 'rotateY(0deg)'
    }
  }, [showSidebar])

  const SetNewEbook = (Ebook: EbookProps) => {
    const webViewer = webViewerRef.current
    if (!webViewer) return

    if (webViewer.childNodes[0]) webViewer.removeChild(webViewer.childNodes[0])

    const NewInstance = document.createElement('div')

    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: Ebook.url
      },
      NewInstance
    ).then((instance) => {
      const { docViewer, setTheme, iframeWindow, disableElements, setToolbarGroup, setLanguage } = instance
      const iframeDoc = iframeWindow.document
      const Body = iframeDoc.querySelector('body')

      disableElements(['toolsHeader'])
      disableElements(['ribbons'])
      // set the default toolbar group to the Shapes group
      setToolbarGroup('toolbarGroup-view')

      disableElements(['highlightToolGroupButton'])
      disableElements(['underlineToolGroupButton'])

      setLanguage('pt_br')
      setTheme('dark')
      // setTheme({ primary: 'blue', secondary: 'white' });
      if (Body) {
        Body.style = WebViewerCSSVariables(theme)
      }

      docViewer.on('documentLoaded', () => {
        // const pageNumber = (Number(Ebook.percentage) * Ebook.numberOfPages) / 100
        const pageNumber = Math.round(Ebook.numberOfPages * (Number(Ebook.percentage) / 100))
        docViewer.setCurrentPage(pageNumber)
      })

      iframeWindow.addEventListener('loaderror', (err) => {
        // Do something with error. eg. instance.showErrorMessage('An error has occurred')
        // alert(err)
        console.log(err)
      })

      docViewer.on('pageNumberUpdated', (pageNumber) => {
        const totalPage = docViewer.getPageCount()
        // const percentage = Math.floor((pageNumber * 100) / totalPage)
        // console.log(percentage, pageNumber, totalPage)

        api.post('/readingList', {
          ebookId: Ebook.id,
          percentage: `${pageNumber}/${totalPage}`
        }).catch(err => console.log(err))
      })
    })

    webViewer.appendChild(NewInstance)
  }

  const handleEbookClick = (index: number) => {
    if (ebooks) {
      SetNewEbook(ebooks[index])
      setReadingBooks(index)
    }
  }

  return (
    <Container>
      <div ref={webViewerRef} className="webViewer"></div>

      <SideBar ref={SideBarRef}>
        <div
          className="puller"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <IoIosArrowBack/>
        </div>

        {ebooks && <HorizontalList>
          {
            ebooks.map((ebook, index) => (
              <Ebook
                key={index}
                active={(index === readingBook)}
                onClick={() => handleEbookClick(index)}
              >
                <img src={ebook.thumbnail} alt={`Capa do livro ${ebook.title}`} />
              </Ebook>
            ))
          }
        </HorizontalList>}
      </SideBar>
    </Container>
  )
}

export default Read
