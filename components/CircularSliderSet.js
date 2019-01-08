import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import CircularSlider from './CircularSlider'

import cssGlobalStyles from '../utils/cssGlobalStyles'

class CircularSliderSet extends Component {
  render() {
    // Dynamically get the width information to feed into the sliders below.
    windowWidth = Dimensions.get('window').width
    windowHeight = Dimensions.get('window').height - 50 // -50 for the toolbar
    meditationSliderRadius = windowWidth / 2.5
    intervalSliderRadius = meditationSliderRadius - 50
    prepTimeSliderRadius = intervalSliderRadius - 50

    return (
      <View>
        <View style={{ flex: 1 }} />
        {/* Meditation controls */}
        <CircularSlider
          value={this.props.meditationValue}
          onValueChange={this.props.handleMeditationValueChange}
          textColor={'#333'}
          startGradient="#e59692"
          endGradient="#c63931"
          startCoord={0}
          btnRadius={20}
          btnColor={'#E06862'}
          dialRadius={meditationSliderRadius}
          pathWidth={2}
          dialWidth={3}
          backgroundColor={cssGlobalStyles.sliderTint}
          showValue={false}
          // Slider 2
          value2={this.props.intervalValue}
          onValueChange2={this.props.handleIntervalValueChange}
          textColor2={'#333'}
          startGradient2="#12D8FA"
          endGradient2="#A6FFCB"
          startCoord2={0}
          btnRadius2={20}
          btnColor2="#78edc0"
          dialRadius2={intervalSliderRadius}
          pathWidth2={2}
          dialWidth2={3}
          backgroundColor2={cssGlobalStyles.sliderTint}
          showValue2={false}
        />
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

export default CircularSliderSet
