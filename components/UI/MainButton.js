import React from 'react'
import styled from 'styled-components/native'

const StyledButton = styled.TouchableOpacity`
  background-color: #ffc300;
  padding: 10px 30px;
  border-radius: 50;
`
const StyledText = styled.Text`
  font-size: 24;
  color: #000;
`

class MainButton extends React.Component {
  render() {
    return (
      <StyledButton disabled={this.props.disabled} onPress={this.props.onPress}>
        <StyledText>{this.props.children}</StyledText>
      </StyledButton>
    )
  }
}

MainButton.defaultProps = {
  disabled: false
}

export default MainButton
