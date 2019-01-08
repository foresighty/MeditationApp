import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity
} from 'react-native'

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
    warningAnim: new Animated.Value(0),
    buttonAnim: new Animated.Value(1)
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
    if (intervalMinutes > meditationMinutes && !this.state.warning) {
      this.setState(
        {
          warning: true
        },
        // toggle a state variable in order to disable or enable the button
        Animated.sequence([
          Animated.timing(this.state.buttonAnim, {
            toValue: 0,
            duration: 250
          }),
          Animated.timing(this.state.warningAnim, {
            toValue: 1,
            duration: 250
          })
        ]).start()
      )
    } else if (intervalMinutes <= meditationMinutes && this.state.warning) {
      this.setState(
        {
          warning: false
        },
        Animated.sequence([
          Animated.timing(this.state.warningAnim, {
            toValue: 0,
            duration: 250
          }),
          Animated.timing(this.state.buttonAnim, {
            toValue: 1,
            duration: 250
          })
        ]).start()
      )
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
          <View style={{ marginTop: 30, marginBottom: 40 }}>
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

          {/* Button and warning text */}
          <View
            style={{
              posiiton: 'relative',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Animated.Text
              style={{
                //opacity: this.state.warningAnim,
                opacity: this.state.warningAnim,
                paddingLeft: 30,
                paddingRight: 30,
                fontSize: 16,
                fontWeight: 'bold',
                color: cssGlobalStyles.warning,
                textAlign: 'center',
                position: 'absolute'
              }}
            >
              Warning: Interval time is longer than meditation time.
            </Animated.Text>
            <Animated.View
              style={{
                opacity: this.state.buttonAnim,
                position: 'absolute'
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'orange',
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderRadius: 50
                }}
                disabled={this.state.warning}
                onPress={() => console.log('Pressed')}
              >
                <Text style={{ fontSize: 24, color: 'black' }}>START</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default TimerScreen
