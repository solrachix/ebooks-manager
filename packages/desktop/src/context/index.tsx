import React from 'react'
import { MemoryRouter, HashRouter, BrowserRouter } from 'react-router-dom'

import { WindowProvider } from './window'
import { UserProvider } from './user'

const AppProvider: React.FC = ({ children }) => {
  return (
    <HashRouter>
      <WindowProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </WindowProvider>
    </HashRouter>
  )
}

export default AppProvider
