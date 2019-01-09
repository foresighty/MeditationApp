import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import TimerScreen from './screens/TimerScreen'
import TimerRunScreen from './screens/TimerRunScreen'
import AboutScreen from './screens/AboutScreen'
import cssGlobalStyles from './utils/cssGlobalStyles'

// Define the navigation stacks
const TimerNavigator = createStackNavigator(
  {
    TimerSet: {
      screen: TimerScreen
    },
    TimerRun: {
      screen: TimerRunScreen
    }
  },
  {
    initialRouteName: 'TimerSet',
    headerMode: 'none'
  }
)

const RootNavigator = createBottomTabNavigator(
  {
    Timer: {
      screen: TimerNavigator
    },
    About: {
      screen: AboutScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let IconComponent = MaterialCommunityIcons
          let iconName

          if (routeName === 'Timer') {
            iconName = focused ? 'clock' : 'clock-outline'
          } else if (routeName === 'About') {
            iconName = focused ? 'information' : 'information-outline'
          }

          return <IconComponent name={iconName} size={25} color={tintColor} />
        }
      }
    },
    tabBarOptions: {
      activeBackgroundColor: cssGlobalStyles.primaryBackgroundColor,
      inactiveBackgroundColor: cssGlobalStyles.primaryBackgroundColor,
      activeTintColor: cssGlobalStyles.activeTint,
      inactiveTintColor: cssGlobalStyles.inactiveTint,
      style: {
        height: 50
      }
    }
  }
)

// Wrap the root navigation stack into <AppContainer />
const AppContainer = createAppContainer(RootNavigator)

// Render the <AppContainer />
class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

export default App
