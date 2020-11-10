import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../pages/Home'
import Read from '../pages/Read'

const { Navigator, Screen } = createBottomTabNavigator()

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Read" component={Read} />
    </Navigator>
  )
}

export default AppRoutes
