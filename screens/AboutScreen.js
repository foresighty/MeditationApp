import React, { Component } from 'react'
import { View, Image } from 'react-native'
import styled from 'styled-components/native'

const CraneLogoImage = styled.Image`
  width: 50%;
  height: 50%;
`

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CraneLogoImage
          source={require('../resources/images/crane-medicine-logo.png')}
        />
      </View>
    )
  }
}

export default AboutScreen
