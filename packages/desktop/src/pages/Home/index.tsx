import React, { useContext } from 'react'
import { useWindow } from '../../context/window'

import { ThemeContext } from 'styled-components'
import { Container } from './styles'

const Home: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { newWindow, newNotification, Toast } = useWindow()
  const { addToast } = Toast

  const handleNotification = () => {
    newNotification({ title: 'title', subtitle: 'subtitle', body: 'body' })
  }
  const handleWindow = () => {
    const window = newWindow({
      title: 'title',
      url: 'https://github.com',
      partition: 'partition',
      backgroundColor: theme.themeColors.background.dark
    })
  }
  const handleToast = () => {
    addToast({
      title: 'teste',
      description: 'aaaaaaaaaaaaaaaaaaaaa',
      type: 'success'
    })
  }
  return (
    <Container>
      <button type="button" onClick={handleNotification}>Nova notificação</button>
      <button type="button" onClick={handleWindow}>Nova janela</button>
      <button type="button" onClick={handleToast}>Nova Toast</button>
    </Container>
  )
}

export default Home
