import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { useUser } from '../context/user'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import Webview from '../pages/WebView'

const Routes: React.FC = () => {
  const { signed } = useUser()

  return (
    <BrowserRouter>
      <Switch>
        {!signed ? <AppRoutes /> : <AuthRoutes />}

        <Route path="/webview/:url" component={Webview} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
