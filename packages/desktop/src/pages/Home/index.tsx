import React, { useContext } from 'react'
import { useWindow } from '../../context/window'

import { ThemeContext } from 'styled-components'
import { Container } from './styles'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { newWindow, newNotification, Toast } = useWindow()

  return (
    <Container>

    </Container>
  )
}

export default Home
