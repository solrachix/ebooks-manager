/* eslint-disable no-unused-expressions */

import electron from 'electron'
import React, { useContext, useState, FormEvent, useEffect } from 'react'

import { useWindow } from './../../context/window'
import { useUser } from '../../context/user'

import api from '@thoth/axios-config'

import { ThemeContext } from 'styled-components'
import { rgba } from 'polished'

import Input from '../../components/Form/Input'
import Text from '../../components/Text'
import { Container, Title, Content, Button } from './styles'

const Auth: React.FC = () => {
  const theme = useContext(ThemeContext).colors
  const { Header, Size, Toast, newWindow } = useWindow()

  const { Auth } = useUser()
  const { signIn } = Auth
  const $ = (elem: string): HTMLElement | null => window.document.querySelector<HTMLElement>(elem)

  useEffect(() => {
    Size.setSize({
      width: 500,
      height: 640
    })
    Header.hidden(true)
  }, [])

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [name, setName] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')

  const handleFormPanelTwo = async () => {
    const formPanelTwo = $('.form-panel.two')
    const panelTwo = formPanelTwo?.scrollHeight
    const Form = $('.form')
    const formHeight = Form?.clientHeight

    $('.form-toggle')?.classList.add('visible')
    $('.form-panel.one')?.classList.add('hidden')
    $('.form-panel.two')?.classList.add('active')

    if (Form) {
      Size.setSize({
        width: 500,
        height: 700
      })

      Form.animate({
        height: [`${formHeight}px`, `${panelTwo}px`]
      }, {
        duration: 500, // number in ms [this would be equiv of your speed].
        easing: 'ease-in-out',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      Form.style.height = `${panelTwo}px`
    }
  }
  const handleToggle = () => {
    const formPanelOne = $('.form-panel.one')
    const panelOne = formPanelOne?.clientHeight
    const Form = $('.form')
    const formHeight = Form?.clientHeight

    $('.form-toggle')?.classList.remove('visible')
    $('.form-panel.one')?.classList.remove('hidden')
    $('.form-panel.two')?.classList.remove('active')

    if (Form) {
      Form.animate({
        height: [`${formHeight}px`, `${panelOne}px`]
      }, {
        duration: 500, // number in ms [this would be equiv of your speed].
        direction: 'normal',
        easing: 'ease-in-out',
        iterations: 1 // infinity or a number.
        // fill: ''
      })

      Form.style.height = `${panelOne}px`
      setTimeout(() => {
        Size.setSize({
          width: 500,
          height: 640
        })
      }, 400)
    }
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()

    const LoginScreen = electron.remote.BrowserWindow.fromId(electron.remote.getCurrentWindow().id)
    const icon = electron.nativeImage.createFromPath(`${electron.remote.app.getAppPath()}/build/icon.png`)

    try {
      await signIn('/user/authenticate', {
        email: loginEmail,
        password: loginPassword
      })
    } catch (error) {
      Toast.addToast({
        title: 'Erro',
        type: 'error',
        description: 'Email ou senha incorretos'
      })
      console.log(error)
    }
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/user/create', {
        name: name.trim(),
        email: registerEmail,
        password: registerPassword
      })

      setLoginEmail(registerEmail)
      setName('')
      setRegisterEmail('')
      setRegisterPassword('')

      Toast.addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'cadastrado com sucesso!'
      })
      handleToggle()
    } catch (error) {
      Toast.addToast({
        title: 'Erro',
        type: 'error',
        description: error
      })
      console.log(error)
    }

    return false
  }
  return (
    <Container>
      {/* <Title>
        <Text
          text="Proffy"
          size={2.5}
          weight={800}
          color={theme.themeColors.primary.normal}
        />
        <br />
        <Text text="Sua plataforma de estudos online" size={1.2} color={rgba(theme.themeColors.text.normal, 0.6)} />
      </Title> */}

      <Content className="form">
        <div className="form-toggle" onClick={handleToggle}></div>
        <div className="form-panel one">
          <div className="form-header">
            <h1>Fazer Login</h1>
          </div>
          <div className="form-content">
            <form onSubmit={handleSignIn} >
              <Input
                id="login-email"
                type="email"
                name="email"
                label="E-mail"
                required

                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value)
                }}
              />

              <Input
                id="login-password"
                type="password"
                name="password"
                label="password"
                required

                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value)
                }}
              />
              <label className="form-remember">
                <input type="checkbox"/>Lembrar-me
                <a className="form-recovery" href="/#">Esqueci minha senha</a>
              </label>
              <Button type="submit">Entrar</Button>
            </form>
          </div>
        </div>
        <div className="form-panel two" onClick={handleFormPanelTwo}>
          <div className="form-header">
            <h1>Fazer cadastro</h1>
          </div>
          <div className="form-content">
            <form onSubmit={handleRegister} >
              <Input
                id="name"
                type="text"
                name="name"
                label="Nome"
                required

                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />

              <Input
                id="register-email"
                type="email"
                name="email"
                label="E-mail"
                required

                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value)
                }}
              />

              <Input
                id="register-password"
                type="password"
                name="password"
                label="password"
                required

                value={registerPassword}
                onChange={(e) => {
                  setRegisterPassword(e.target.value)
                }}
              />

              <Button type="submit">Cadastrar</Button>
            </form>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default Auth
