import React from 'react'
import styled from 'styled-components/native'

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.bgColor || '#424682'};
  padding: 10px 30px;
  border-radius: 50;
  border: 2px solid ${props => props.fgColor || '#fff'};
  display: flex;
  align-items: center;
  min-width: ${props => props.width || '125px'};
`
const StyledText = styled.Text`
  font-size: ${props => props.fontSize || 12};
  color: ${props => props.fgColor || '#fff'};
`

class MainButton extends React.Component {
  render() {
    return (
      <StyledButton
        bgColor={this.props.bgColor}
        fgColor={this.props.fgColor}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        width={this.props.width}
      >
        <StyledText fgColor={this.props.fgColor} fontSize={this.props.fontSize}>
          {this.props.children}
        </StyledText>
      </StyledButton>
    )
  }
}

MainButton.defaultProps = {
  disabled: false
}

export default MainButton
