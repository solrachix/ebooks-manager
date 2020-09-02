import React, { useContext, useCallback, useMemo, useEffect, useState, createRef } from 'react'
import { useLocation } from 'react-router-dom'
import { remote } from 'electron'
import os from 'os'

import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

import { Container, Titleshown, WindowActions, MacActionButton, DefaultActionButton, MenuButton } from './styles'
import { useConfig } from '../../hooks/useConfig'
import { ThemeContext } from 'styled-components'

const Header: React.FC = () => {
  const location = useLocation()
  const theme = useContext(ThemeContext).colors

  const [rootRoute, setRootRoute] = useState(location.pathname === '/')
  const [isMaximized, setIsMaximized] = useState<boolean>(remote.getCurrentWindow().isMaximized())

  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    console.log(!window.isMaximized())
    if (!window.isMaximized()) {
      window.maximize()
      setIsMaximized(true)
    } else {
      window.unmaximize()
      setIsMaximized(false)
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  const useMacOSWindowActionButtons = useConfig('useMacOSWindowActionButtons')

  const shouldUseMacOSWindowActions = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin'
  }, [useMacOSWindowActionButtons])

  return (
    <Container reverse={shouldUseMacOSWindowActions}>
      <MenuButton onClick={() => {}} >&#8285;</MenuButton>

      <Titleshown id="titleshown">
        <p>
          { rootRoute && location.pathname.replaceAll('/', '')}
        </p>
      </Titleshown>

      <WindowActions>
        {shouldUseMacOSWindowActions ? (
          <>
            <MacActionButton color="close" onClick={handleCloseWindow}>
              <FiX />
            </MacActionButton>
            <MacActionButton color="minimize" onClick={handleMinimize}>
              <FiMinus />
            </MacActionButton>
            <MacActionButton color="maximize" onClick={handleMaximize}>
              { !isMaximized ? <FiMaximize2 /> : <FiMinimize2 />}
            </MacActionButton>
          </>
        ) : (
          <>
            <DefaultActionButton pointerEvents="auto" onClick={handleMinimize}>
              <FiMinus size={12} />
            </DefaultActionButton>
            <DefaultActionButton pointerEvents="auto" onClick={handleMaximize}>
              { !isMaximized ? <FiMaximize2 size={10} /> : <FiMinimize2 size={10} />}
            </DefaultActionButton>
            <DefaultActionButton pointerEvents="auto" onClick={handleCloseWindow}>
              <FiX size={12} />
            </DefaultActionButton>
          </>
        )}
      </WindowActions>

    </Container>
  )
}

export default Header
