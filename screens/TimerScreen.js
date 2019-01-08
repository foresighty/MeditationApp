import React, { Component } from 'react'
import { View, Text, Slider, Picker } from 'react-native'

import CircularSliderSet from '../components/CircularSliderSet'
import cssGlobalStyles from '../utils/cssGlobalStyles'

class TimerScreen extends Component {
  state = {
    meditationValue: 30, // 5 minutes (5 * 6 degrees)
    meditationMinutes: 5,
    intervalValue: 36, // 3 minutes (3 * 12 degrees)
    intervalMinutes: 3,
    prepTimeValue: 90,
    prepTimeSeconds: 15
  }

  handleMeditationValueChange = angle => {
    this.setState({
      meditationMinutes: Math.round(angle / 6)
    })
  }

  handleIntervalValueChange = angle => {
    this.setState({
      intervalMinutes: Math.round(angle / 12)
    })
  }

  handlePrepValueChange = angle => {
    this.setState({
      prepTimeSeconds: Math.round(angle / 6)
    })
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
          prepTimeValue={this.state.prepTimeValue}
          handlePrepValueChange={this.handlePrepValueChange}
          meditationMinutes={this.state.meditationMinutes}
          intervalMinutes={this.state.intervalMinutes}
          prepTimeSeconds={this.state.prepTimeSeconds}
        />
      </View>
    )
  }
}

export default TimerScreen
