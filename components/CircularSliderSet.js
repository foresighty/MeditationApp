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
        {/* Meditation controls */}
        <CircularSlider
          value={this.props.meditationValue}
          onValueChange={this.props.handleMeditationValueChange}
          textColor={'#E06862'}
          textSize={16}
          timeValue={this.props.meditationMinutes}
          startGradient="#e59692"
          endGradient="#c63931"
          startCoord={0}
          btnRadius={20}
          btnColor={cssGlobalStyles.sliderMeditationTint}
          dialRadius={meditationSliderRadius}
          pathWidth={2}
          dialWidth={3}
          backgroundColor={cssGlobalStyles.sliderBGTint}
          showValue={false}
          // Slider 2
          value2={this.props.intervalValue}
          onValueChange2={this.props.handleIntervalValueChange}
          textColor2="#78edc0"
          textSize2={16}
          timeValue2={this.props.intervalMinutes}
          startGradient2="#12D8FA"
          endGradient2="#A6FFCB"
          startCoord2={0}
          btnRadius2={20}
          btnColor2={cssGlobalStyles.sliderIntervalTint}
          dialRadius2={intervalSliderRadius}
          pathWidth2={2}
          dialWidth2={3}
          backgroundColor2={cssGlobalStyles.sliderBGTint}
          showValue2={false}
          //slider3
          value3={this.props.prepTimeValue}
          onValueChange3={this.props.handlePrepValueChange}
          textColor3="#3aa3ff"
          textSize3={16}
          timeValue3={this.props.prepTimeSeconds}
          startGradient3="#87c6ff"
          endGradient3="#1491ff"
          startCoord3={0}
          btnRadius3={20}
          btnColor3={cssGlobalStyles.sliderPrepTint}
          dialRadius3={prepTimeSliderRadius}
          pathWidth3={2}
          dialWidth3={3}
          backgroundColor3={cssGlobalStyles.sliderBGTint}
          showValue3={false}
        />
      </View>
    )
  }
}

export default CircularSliderSet
