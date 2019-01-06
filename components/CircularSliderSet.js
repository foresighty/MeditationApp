import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import CircularSlider from './CircularSlider'

class CircularSliderSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slider1: 270,
      slider2: 180
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <CircularSlider
          value={90}
          textColor={'#333'}
          startGradient="#12D8FA"
          endGradient="#A6FFCB"
          startCoord={0}
          btnRadius={13}
          btnColor="#0879a5"
          dialRadius={130}
          pathWidth={2}
          dialWidth={25}
          backgroundColor={'#333'}
        />
        <View style={{ flex: 1 }} />
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
