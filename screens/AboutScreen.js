import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../resources/images/crane-medicine-logo.png')}
        />
      </View>
    )
  }
}

export default AboutScreen
