import React, { useContext, useCallback, useMemo, useEffect, useState, createRef } from 'react'
import { useLocation } from 'react-router-dom'
import { remote } from 'electron'
import os from 'os'

import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { IoIosLogOut, IoIosStarOutline, IoIosHeartEmpty, IoIosCalendar, IoMdClose } from 'react-icons/io'
import { BsBookmarksFill, BsBookmarks } from 'react-icons/bs'
import LogoIcon from '../../assets/logo.svg'

import { Container, Titleshown, WindowActions, MacActionButton, DefaultActionButton, MenuButton, Logo, Link, LINK_TAB_SIZE } from './styles'
import { useConfig } from '../../hooks/useConfig'
import { ThemeContext } from 'styled-components'

interface HeaderProps {
  title: string;
  hidden: boolean;
}

const Tabs = [
  {
    to: "/#",
    icon: IoIosStarOutline
  },
  {
    to: "/#",
    icon: IoIosHeartEmpty
  },
  {
    to: "/#",
    icon: IoIosCalendar
  },
  {
    to: "/#",
    icon: BsBookmarks
  }
]

const Header: React.FC<HeaderProps>= ({ title, hidden }) => {
  const location = useLocation()
  const theme = useContext(ThemeContext).colors

  const [numberOfTabs, setNumberOfTabs] = useState(4)
  const [openTab, setOpenTab] = useState(0)
  const [rootRoute, setRootRoute] = useState(location.pathname === '/')
  const [isMaximized, setIsMaximized] = useState<boolean>(remote.getCurrentWindow().isMaximized())
  const [openWindowActions, setOpenWindowActions] = useState(false)

  useEffect(() => {
    const square = $('.square')

    if (square) {
      square.animate({
        left: [`-60%`, `20%`]
      }, {
        duration: 400, // number in ms [this would be equiv of your speed].
        easing: 'ease-in',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      square.style.left = `20%`
    }
  }, [])

  const goToTab = (id: number) => {
    const square = $('.square')
    const sideBar = $('.sideBar')

    if (square && sideBar) {
      const moveToPX = (id: number) => ((sideBar.clientHeight/numberOfTabs) * id - 62)

      square.animate({
        marginTop: [
          `${moveToPX(openTab)}px`,
          `${moveToPX(id)}px`
        ]
      }, {
        duration: 400, // number in ms [this would be equiv of your speed].
        easing: 'ease-in',
        iterations: 1 // infinity or a number.
        // fill: ''
      })
      square.style.marginTop = `${moveToPX(id)}px`

      setOpenTab(id)
    }
  }

  const handleLogo = async () => {
    const logoIcon = $('.logoIcon')
    const close = $('.close')
    const windowActions = $('.windowActions')


    if (logoIcon && close && windowActions) {
      if(openWindowActions){
        windowActions.animate({
          opacity: [ 1, 0 ],
          transform: ['translateX(6rem)','translateX(-6rem)']
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        }).finished

        windowActions.style.opacity = '0'
        windowActions.style.transform = 'translateX(-6rem)'


        close.animate({
          opacity: [ 1, 0 ]
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        }).onfinish = () => {
          close.style.display = `none`
          logoIcon.style.display = `block`

          logoIcon.animate({
            opacity: [ 0, 1 ]
          }, {
            duration: 800,
            easing: 'ease-in-out',
            iterations: 1
          }).onfinish = () => {
            logoIcon.style.opacity = '1'
          }

        }

      } else {
        windowActions.animate({
          opacity: [ 0, 1 ],
          transform: ['translateX(0px)','translateX(6rem)']
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        }).finished

        windowActions.style.opacity = '1'
        windowActions.style.transform = 'translateX(6rem)'

        logoIcon.animate({
            opacity: [ 1, 0 ]
          }, {
            duration: 800,
            easing: 'ease-in-out',
            iterations: 1
          }).onfinish = () => {
            logoIcon.style.display = `none`
            close.style.display = `block`

            close.animate({
              opacity: [ 0, 1 ]
            }, {
              duration: 800,
              easing: 'ease-in-out',
              iterations: 1
            }).onfinish = () => {
              close.style.opacity = '1'
            }

          }

      }

      setOpenWindowActions(!openWindowActions)
    }
  }

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

  if (!hidden) return <></>

  return (
    <Container>
      <div>
        <Logo onClick={handleLogo}>
          <LogoIcon className="logoIcon" />

          <IoMdClose className="close" />
        </Logo>

        <Titleshown className="sideBar" >
          <div className="square" />
          {
            Tabs.map((props, index) => (
              <Link key={index}
                to={props.to}
                actived={openTab === index}
                onClick={() => goToTab(index)}
              >
                {props.icon({})}
              </Link>
            ))
          }

        </Titleshown>


        <WindowActions className="windowActions" >
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
              <DefaultActionButton pointerEvents="auto" onClick={handleCloseWindow}>
                <FiX size={12} />
              </DefaultActionButton>
              <DefaultActionButton pointerEvents="auto" onClick={handleMaximize}>
                { !isMaximized ? <FiMaximize2 size={10} /> : <FiMinimize2 size={10} />}
              </DefaultActionButton>
              <DefaultActionButton pointerEvents="auto" onClick={handleMinimize}>
                <FiMinus size={12} />
              </DefaultActionButton>
            </>
          )}
        </WindowActions>

        <MenuButton onClick={() => {}} ><IoIosLogOut /></MenuButton>
      </div>
    </Container>
  )
}

export default Header
