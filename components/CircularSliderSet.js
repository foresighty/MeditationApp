import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import CircularSlider from './CircularSlider'

import cssGlobalStyles from '../utils/cssGlobalStyles'

class CircularSliderSet extends Component {
  handleValueChange = angle => {
    console.log(`${Math.round(angle / 6)} minutes`)
  }

  render() {
    // Dynamically get the width information to feed into the sliders below.
    console.log('window dimensions:', Dimensions.get('window').width)
    console.log('screen dimensions:', Dimensions.get('screen').width)
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: '' }} />
        <View style={{ position: 'relative' }}>
          {/* Meditation controls */}
          <CircularSlider
            value={this.props.meditationValue}
            onValueChange={this.props.handleMeditationValueChange}
            textColor={'#333'}
            startGradient="#e59692"
            endGradient="#c63931"
            startCoord={0}
            btnRadius={20}
            btnColor={cssGlobalStyles.activeTint}
            dialRadius={375 / 2 - 20}
            pathWidth={2}
            dialWidth={3}
            backgroundColor={cssGlobalStyles.inactiveTint}
            showValue={false}
          />
          {/* This styling needs to be made dynamic.
            Top and Left Values are determined by each slider's radius.
            The slider itself should size itself depending on the device width.
          */}
          <View
            style={{
              position: 'absolute',
              top: 150 - 80,
              left: 150 - 80
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
              dialRadius={80}
              pathWidth={2}
              dialWidth={3}
              backgroundColor={cssGlobalStyles.inactiveTint}
              showValue={false}
            />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: '' }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  slider1: {
    position: 'absolute',
    backgroundColor: 'orange',
    top: 0,
    left: 50
  },
  slider2: {
    position: 'absolute',
    top: 25,
    left: 25
  }
})

export default CircularSliderSet
