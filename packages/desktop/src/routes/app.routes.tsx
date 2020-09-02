import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
    </>
  )
}

export default AppRoutes
