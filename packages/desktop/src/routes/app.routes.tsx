import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Read from '../pages/Read'
import Search from '../pages/Search'

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/read" component={Read} />
      <Route path="/search" component={Search} />
    </>
  )
}

export default AppRoutes
