import React, { useContext, useEffect } from 'react'
import { useWindow } from '../../context/window'

import { ThemeContext } from 'styled-components'
import { Container } from './styles'
import Search from './../../components/Search/index'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { newWindow, newNotification, Toast, Header, Size } = useWindow()

  useEffect(() => {
    Header.hidden(true)
  }, [])
  return (
    <Container>

      <header>

        <Search />
      </header>
    </Container>
  )
}

export default Home
