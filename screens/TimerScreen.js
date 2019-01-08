import React, { Component } from 'react'
import { View, Text, SafeAreaView, Animated } from 'react-native'

import CircularSliderSet from '../components/CircularSliderSet'
import cssGlobalStyles from '../utils/cssGlobalStyles'

class TimerScreen extends Component {
  state = {
    meditationValue: 30, // 5 minutes (5 * 6 degrees)
    meditationMinutes: 5,
    intervalValue: 36, // 3 minutes (3 * 12 degrees)
    intervalMinutes: 3,
    prepTimeValue: 90,
    prepTimeSeconds: 15,
    warning: false,
    warningAnim: new Animated.Value(0)
  }

  handleMeditationValueChange = angle => {
    this.setState(
      {
        meditationMinutes: Math.round(angle / 6)
      },
      this.isTimeValid()
    )
  }

  handleIntervalValueChange = angle => {
    this.setState(
      {
        intervalMinutes: Math.round(angle / 12)
      },
      this.isTimeValid()
    )
  }

  handlePrepValueChange = angle => {
    this.setState({
      prepTimeSeconds: Math.round(angle / 6)
    })
  }

  isTimeValid = () => {
    // Check if the interval time exceeds the meditation time.
    const { meditationMinutes, intervalMinutes } = this.state
    if (intervalMinutes > meditationMinutes) {
      Animated.timing(this.state.warningAnim, {
        toValue: 1
      }).start()
    } else if (intervalMinutes <= meditationMinutes) {
      Animated.timing(this.state.warningAnim, {
        toValue: 0
      }).start()
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: cssGlobalStyles.primaryBackgroundColor
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cssGlobalStyles.primaryBackgroundColor
          }}
        >
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              top: 20
            }}
          >
            <Text
              style={{
                color: cssGlobalStyles.sliderMeditationTint,
                fontSize: 18
              }}
            >
              Meditation Time: {this.state.meditationMinutes} mins
            </Text>
            <Text
              style={{
                color: cssGlobalStyles.sliderIntervalTint,
                fontSize: 18
              }}
            >
              Interval Time: {this.state.intervalMinutes} mins
            </Text>
            <Text
              style={{ color: cssGlobalStyles.sliderPrepTint, fontSize: 18 }}
            >
              Preparation Time: {this.state.prepTimeSeconds} s
            </Text>
          </View>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
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
          <Animated.Text
            style={{
              opacity: this.state.warningAnim,
              paddingLeft: 30,
              paddingRight: 30,
              fontSize: 16,
              fontWeight: 'bold',
              color: cssGlobalStyles.warning,
              textAlign: 'center'
            }}
          >
            Warning: Interval time is longer than meditation time.
          </Animated.Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default TimerScreen
