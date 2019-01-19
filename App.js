import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SplashScreen from 'react-native-splash-screen'

import TimerScreen from './screens/TimerScreen'
import TimerRunScreen from './screens/TimerRunScreen'
import AboutScreen from './screens/AboutScreen'
import cssGlobalStyles from './utils/cssGlobalStyles'
import cssToReactNative from 'css-to-react-native'

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

TimerNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return { tabBarVisible }
}

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
      inactiveTintColor: cssGlobalStyles.controlHighlight,
      style: {
        height: 50,
        backgroundColor: cssGlobalStyles.primaryBackgroundColor
      }
    }
  }
)

// Wrap the root navigation stack into <AppContainer />
const AppContainer = createAppContainer(RootNavigator)

// Render the <AppContainer />
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return <AppContainer />
  }
}

export default App
