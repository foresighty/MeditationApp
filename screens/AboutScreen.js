import React, { Component } from 'react'
import { View, Text } from 'react-native'

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Screen</Text>
        <Text>
          Some information perhaps about David, and app development by Chuck
        </Text>
      </View>
    )
  }
}

export default AboutScreen
