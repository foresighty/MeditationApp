import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import CircularSlider from './CircularSlider'

import cssGlobalStyles from '../utils/cssGlobalStyles'

class CircularSliderSet extends Component {
  handleValueChange = angle => {
    console.log(`${Math.round(angle / 6)} minutes`)
  }

  render() {
    // Dynamically get the width information to feed into the sliders below.
    ;(windowWidth = Dimensions.get('window').width),
      (windowHeight = Dimensions.get('window').height - 50) // -50 for the toolbar
    meditationSliderRadius = windowWidth / 2.5
    intervalSliderRadius = meditationSliderRadius - 50
    prepTimeSliderRadius = intervalSliderRadius - 50
    console.log(windowWidth)
    console.log(meditationSliderRadius)

    return (
      <View>
        <View style={{ flex: 1, backgroundColor: '' }} />
        <View
          style={{
            position: 'absolute',
            left:
              -(windowWidth / 2) +
              (windowWidth - meditationSliderRadius * 2) / 4,
            top: windowHeight / 4
          }}
        >
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
            yCenter={
              //50 pixels removed because of navigationbar
              (Dimensions.get('window').height - 50) / 2
            }
          />
          <View
            style={{
              position: 'absolute',
              top: meditationSliderRadius - intervalSliderRadius,
              left: meditationSliderRadius - intervalSliderRadius
            }}
          >
            {/* Interval Controls */}
            <CircularSlider
              value={this.props.intervalValue}
              onValueChange={this.props.handleIntervalValueChange}
              textColor={'#333'}
              startGradient="#12D8FA"
              endGradient="#A6FFCB"
              startCoord={0}
              btnRadius={20}
              btnColor="#78edc0"
              dialRadius={intervalSliderRadius}
              pathWidth={2}
              dialWidth={3}
              backgroundColor={cssGlobalStyles.sliderTint}
              showValue={false}
              yCenter={
                //50 pixels removed because of navigationbar
                (Dimensions.get('window').height - 50) / 2
              }
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: meditationSliderRadius - prepTimeSliderRadius,
              left: meditationSliderRadius - prepTimeSliderRadius
            }}
          >
            {/* PrepTime Controls */}
            <CircularSlider
              value={this.props.prepTimeValue}
              onValueChange={this.props.handlePrepValueChange}
              textColor={'#333'}
              startGradient="#87c6ff"
              endGradient="#1491ff"
              startCoord={0}
              btnRadius={20}
              btnColor="#3aa3ff"
              dialRadius={prepTimeSliderRadius}
              pathWidth={2}
              dialWidth={3}
              backgroundColor={cssGlobalStyles.sliderTint}
              showValue={false}
              yCenter={
                //50 pixels removed because of navigationbar
                (Dimensions.get('window').height - 50) / 2
              }
            />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '' }} />
      </View>
    )
  }
}

export default CircularSliderSet
