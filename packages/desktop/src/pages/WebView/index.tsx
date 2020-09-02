import Electron, { WebviewTag, shell, remote } from 'electron'
import { URL } from 'url'

import React, { useState, useEffect, useContext, createRef } from 'react'
import { ThemeContext } from 'styled-components'
import insertCSS from './insertCSS'

import Loading from '../../components/Loading'
// import NotFound from '../NotFound'
import { Container, ContainerDevtools } from './styles'

interface ContextMenuEvent extends Electron.Event {
  params?: Electron.ContextMenuParams
}
interface Props {
  match: {
    params: {
      url: string
    }
  }
}
const WebView: React.FC<Props> = ({ match }) => {
  const theme = useContext(ThemeContext)
  const url = match.params.url.replaceAll('-', '/')

  const webviewRef = createRef<WebviewTag>()
  const devtoolsRef = createRef<WebviewTag>()

  const [loading, setLoading] = useState<boolean>(true)
  const [failLoad, setFailLoad] = useState<boolean>(false)
  const [isDevToolsOpened, setIsDevToolsOpened] = useState<boolean>(false)
  const [address, setAddress] = useState('data:text/plain,Hello, world!')

  useEffect(() => {
    const webview = webviewRef.current as WebviewTag
    const devtools = devtoolsRef.current as WebviewTag

    // webview.useragent = 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19'

    webview.addEventListener('dom-ready', () => {
      const browser = webview.getWebContents()
      browser.setDevToolsWebContents(devtools.getWebContents())

      let isDevToolsOpen = false
      function setDevTools () {
        isDevToolsOpen = !isDevToolsOpen
        setIsDevToolsOpened(isDevToolsOpen)
      }

      // setItemMenu([
      //   {
      //     label: 'Inspecionar',
      //     onClick: () => {
      //       if (isDevToolsOpened) {
      //         browser.closeDevTools()
      //         // setIsDevToolsOpened(false)
      //       } else {
      //         browser.openDevTools()
      //         // setIsDevToolsOpened(true)
      //       }

      //       setDevTools()
      //     }
      //   },
      //   {
      //     label: 'Atualizar',
      //     onClick: () => webview.reload()
      //   }
      // ])

      // browser.loadFile('aaaaaaaaaa')
      webview.insertCSS(insertCSS(theme))
    })

    webview.addEventListener('did-start-loading', () => {
      setFailLoad(false)
      // setLoading(true)
    })
    webview.addEventListener('did-finish-load', () => setLoading(false))
    webview.addEventListener('did-fail-load', error => {
      console.log(error)

      // !error.isTrusted && setFailLoad(true)
    })

    // webview.addEventListener('page-favicon-updated', eventFavicon => {
    //   webview.addEventListener('page-title-updated', eventTitle => setUrl()
    //     .attribute([
    //       { name: 'title', value: eventTitle.title },
    //       { name: 'favicon', value: eventFavicon.favicons[0] }
    //     ]))
    // })

    webview.addEventListener('will-navigate', event => {
      setLoading(true)
    })
    webview.addEventListener('did-navigate', event => {
      setLoading(false)
    })
    webview.addEventListener('did-navigate-in-page', event => {
      setLoading(false)
    })

    webview.addEventListener('new-window', async (e) => {
      const protocol = new URL(e.url).protocol
      if (protocol === 'http:' || protocol === 'https:') {
        console.log(e.url)
        await shell.openExternal(e.url)
      }
    })

    webview.addEventListener('context-menu', (event: ContextMenuEvent) => {
      // removeItemsMenu([
      //   'Copiar'
      // ])
      const browser = remote.webContents.fromId(webview.getWebContentsId())
      const editFlags = event!.params?.editFlags
      const items = []

      if (!editFlags) return

      if (editFlags.canSelectAll) {
        items.push({
          label: 'Selecionar tudo',
          onClick: () => {
            browser.selectAll()
          }
        })
      }

      // setItemMenu(items)
    })

    return () => {
      // removeItemsMenu([
      //   'Atualizar',
      //   'Inspecionar',
      //   'Selecionar tudo'
      // ])
    }
  }, [])

  return (
    <Container loading={loading}>
      <webview id="webview"
        ref={webviewRef}
        src={url}

        plugins
        partition="electron"
        allowpopups
        webpreferences="allowRunningInsecureContent=yes, nodeintegrationinsubframes=false"
        // enableblinkfeatures="PreciseMemoryInfo, CSSVariables"
      />

      <ContainerDevtools
        open={isDevToolsOpened}
      >
        <webview id="DevTools" ref={devtoolsRef} />
      </ContainerDevtools>

      { loading && <Loading /> }
      {/* { failLoad && <NotFound />} */}
    </Container>
  )
}

export default WebView
