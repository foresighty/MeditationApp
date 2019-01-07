import React, { Component } from 'react'
import { View, Text, Slider, Picker } from 'react-native'

import CircularSliderSet from '../components/CircularSliderSet'
import cssGlobalStyles from '../utils/cssGlobalStyles'

class TimerScreen extends Component {
  state = {
    meditationValue: 30, // 5 minutes (5 * 6 degrees)
    intervalValue: 36 // 3 minutes (3 * 12 degrees)
  }

  handleMeditationValueChange = angle => {
    console.log(`Timer Screen: ${Math.round(angle / 6)} minutes`)
  }

  handleIntervalValueChange = angle => {
    console.log(`Timer Screen (Interval): ${Math.round(angle / 12)} minutes`)
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cssGlobalStyles.primaryBackgroundColor
        }}
      >
        <Text style={{ color: 'black', position: 'relative', top: 80 }}>
          Timer Screen
        </Text>
        <CircularSliderSet
          meditationValue={this.state.meditationValue}
          intervalValue={this.state.intervalValue}
          handleMeditationValueChange={this.handleMeditationValueChange}
          handleIntervalValueChange={this.handleIntervalValueChange}
        />
      </View>
    )
  }
}

export default TimerScreen
