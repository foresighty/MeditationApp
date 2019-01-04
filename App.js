import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import TimerScreen from './screens/TimerScreen'
import AboutScreen from './screens/AboutScreen'

// Define the navigation stacks
const rootNavigator = createBottomTabNavigator({
  Timer: {
    screen: TimerScreen
  },
  About: {
    screen: AboutScreen
  }
})

// Wrap the root navigation stack into <AppContainer />
const AppContainer = createAppContainer(rootNavigator)

// Render the <AppContainer />
class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

export default App
