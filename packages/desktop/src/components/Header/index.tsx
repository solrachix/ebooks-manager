import React, { useContext, useCallback, useMemo, useEffect, useState, createRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { remote } from 'electron'
import os from 'os'

import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { IoIosLogOut, IoIosHeartEmpty, IoIosCalendar, IoMdClose } from 'react-icons/io'
import { BsBookmarksFill, BsBookmarks, BsSearch, BsUpload } from 'react-icons/bs'
import { VscHome } from 'react-icons/vsc'
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
    to: '/',
    icon: VscHome
  },
  {
    to: '/',
    icon: IoIosHeartEmpty
  },
  {
    to: '/search',
    icon: BsSearch
  },
  {
    to: '/upload',
    icon: BsUpload
  }
  // {
  //   to: '/#',
  //   icon: IoIosCalendar
  // },
  // {
  //   to: '/#',
  //   icon: BsBookmarks
  // }
]

const Header: React.FC<HeaderProps> = ({ title, hidden }) => {
  const theme = useContext(ThemeContext).colors
  const [user, setUser] = useConfig('user')
  const location = useLocation()
  const history = useHistory()

  // const [numberOfTabs, setNumberOfTabs] = useState(4)
  const [openTab, setOpenTab] = useState(0)
  const [animationCurrentlyRunning, setAnimationCurrentlyRunning] = useState<Animation | null>(null)
  // const [rootRoute, setRootRoute] = useState(location.pathname === '/')
  const [isMaximized, setIsMaximized] = useState<boolean>(remote.getCurrentWindow().isMaximized())
  const [openWindowActions, setOpenWindowActions] = useState(false)

  useEffect(() => {
    const square = $('.square')

    if (square) {
      square.animate({
        left: ['-60%', '20%']
      }, {
        duration: 400, // number in ms [this would be equiv of your speed].
        easing: 'ease-in',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      square.style.left = '20%'
    }
  }, [])

  const goToTab = (id: number) => {
    const square = $('.square')
    const sideBar = $('.sideBar')
    const bodyHeight = window.document.body.clientHeight

    if (square && sideBar) {
      // const moveToPorcent = (id: number) => Math.floor((($(`#tab-${id}`)!.offsetTop * 100)/bodyHeight) + ((6.25 * 100)/bodyHeight) )
      const moveToPX = (id: number) => $(`#tab-${id}`)!.offsetTop + 80

      console.log(
        `${moveToPX(openTab)}px`,
        `${moveToPX(id)}px`
      )

      square.animate({
        top: [
          `${moveToPX(openTab)}px`,
          `${moveToPX(id)}px`
        ]
      }, {
        duration: 400, // number in ms [this would be equiv of your speed].
        easing: 'ease-in',
        iterations: 1 // infinity or a number.
        // fill: ''
      })
      square.style.top = `${moveToPX(id)}px`

      setOpenTab(id)
    }
  }

  const handleSignOut = useCallback(() => {
    localStorage.clear()
    setUser({
      Logged: false,
      token: null,
      data: null
    })
  }, [])

  const handleLogo = async () => {
    const logoIcon = $('.logoIcon')
    const close = $('.close')
    const windowActions = $('.windowActions')

    if (logoIcon && close && windowActions) {
      animationCurrentlyRunning?.cancel()

      if (openWindowActions) {
        const windowActionsAnimation = windowActions.animate({
          opacity: [1, 0],
          transform: ['translateX(6rem)', 'translateX(-6rem)']
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        })

        setAnimationCurrentlyRunning(windowActionsAnimation)

        const CloseAnimation = close.animate({
          opacity: [1, 0]
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        })

        CloseAnimation.onfinish = () => {
          close.style.display = 'none'
          logoIcon.style.display = 'block'

          const logoIconAnimation = logoIcon.animate({
            opacity: [0, 1]
          }, {
            duration: 800,
            easing: 'ease-in-out',
            iterations: 1
          })

          logoIconAnimation.onfinish = () => {
            logoIcon.style.opacity = '1'
          }

          setAnimationCurrentlyRunning(logoIconAnimation)
        }

        windowActions.style.opacity = '0'
        windowActions.style.transform = 'translateX(-6rem)'
        setAnimationCurrentlyRunning(CloseAnimation)
      } else {
        const windowActionsAnimation = windowActions.animate({
          opacity: [0, 1],
          transform: ['translateX(0px)', 'translateX(6rem)']
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        })
        setAnimationCurrentlyRunning(windowActionsAnimation)

        windowActions.style.opacity = '1'
        windowActions.style.transform = 'translateX(6rem)'

        const logoIconAnimation = logoIcon.animate({
          opacity: [1, 0]
        }, {
          duration: 800,
          easing: 'ease-in-out',
          iterations: 1
        })

        logoIconAnimation.onfinish = () => {
          logoIcon.style.display = 'none'
          close.style.display = 'block'

          const CloseAnimation = close.animate({
            opacity: [0, 1]
          }, {
            duration: 800,
            easing: 'ease-in-out',
            iterations: 1
          })

          CloseAnimation.onfinish = () => {
            close.style.opacity = '1'
          }

          setAnimationCurrentlyRunning(CloseAnimation)
        }

        setAnimationCurrentlyRunning(logoIconAnimation)
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
                id={`tab-${index}`}
                // href={props.to}
                actived={openTab === index}
                onClick={() => {
                  history.push(props.to)
                  goToTab(index)
                }}
              >
                {props.icon({})}
              </Link>
            ))
          }

        </Titleshown>

        <WindowActions className="windowActions" >
          {shouldUseMacOSWindowActions[0] ? (
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

        <MenuButton
          onClick={handleSignOut}
        ><IoIosLogOut /></MenuButton>
      </div>
    </Container>
  )
}

export default Header
