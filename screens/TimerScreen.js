import React, { Component } from 'react'
import { View, Text, Slider, Picker } from 'react-native'

import CircularSliderSet from '../components/CircularSliderSet'

class TimerScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey'
        }}
      >
        <Text>Timer Screen</Text>
        <CircularSliderSet />
      </View>
    )
  }
}

export default TimerScreen
