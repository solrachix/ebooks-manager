import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Read from '../pages/Read'

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Read} />
      <Route path="/read" exact component={Home} />
    </>
  )
}

export default AppRoutes
