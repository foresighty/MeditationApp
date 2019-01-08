/* Code based from
https://github.com/2joocy/react-native-circular-slider
*/

import React, { Component } from 'react'
import { PanResponder, View, Dimensions } from 'react-native'
import Svg, {
  Path,
  Circle,
  G,
  Text,
  Defs,
  LinearGradient,
  Stop
} from 'react-native-svg'

export default class CircleSlider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      angle: this.props.value,
      xCenter: 0,
      yCenter: 0,
      angle2: this.props.value2,
      xCenter2: 0,
      yCenter2: 0
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        let xOrigin =
          this.state.xCenter - (this.props.dialRadius + this.props.btnRadius)
        let yOrigin =
          this.state.yCenter - (this.props.dialRadius + this.props.btnRadius)
        //console.log(yOrigin)
        let a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin)
        this.setState({ angle: a }),
          // Callback function added to fire the onValueChange function in order to make changes in CircularSliderSet.
          this.props.onValueChange(this.state.angle)
      }
    })

    this._panResponder2 = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        let xOrigin =
          this.state.xCenter -
          (this.props.dialRadius + this.props.btnRadius) +
          (this.props.dialRadius2 + this.props.btnRadius2) / 2
        let yOrigin =
          this.state.yCenter -
          (this.props.dialRadius + this.props.btnRadius) +
          (this.props.dialRadius2 + this.props.btnRadius2) / 2

        let a = this.cartesianToPolar2(gs.moveX - xOrigin, gs.moveY - yOrigin)
        this.setState({ angle2: a }),
          // Callback function added to fire the onValueChange function in order to make changes in CircularSliderSet.
          this.props.onValueChange2(this.state.angle2)
      }
    })
  }

  polarToCartesian(angle) {
    let r = this.props.dialRadius
    let hC = this.props.dialRadius + this.props.btnRadius
    let a = ((angle - 90) * Math.PI) / 180.0

    let x = hC + r * Math.cos(a)
    let y = hC + r * Math.sin(a)
    return { x, y }
  }

  polarToCartesian2(angle) {
    let r = this.props.dialRadius2
    let hC = this.props.dialRadius2 + this.props.btnRadius2
    let a = ((angle - 90) * Math.PI) / 180.0

    let x = hC + r * Math.cos(a)
    let y = hC + r * Math.sin(a)
    return { x, y }
  }

  cartesianToPolar(x, y) {
    let hC = this.props.dialRadius + this.props.btnRadius

    if (x === 0) {
      return y > hC ? 0 : 180
    } else if (y === 0) {
      return x > hC ? 90 : 270
    } else {
      return (
        Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
        (x > hC ? 90 : 270)
      )
    }
  }

  cartesianToPolar2(x, y) {
    let hC = this.props.dialRadius2 + this.props.btnRadius2

    if (x === 0) {
      return y > hC ? 0 : 180
    } else if (y === 0) {
      return x > hC ? 90 : 270
    } else {
      return (
        Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
        (x > hC ? 90 : 270)
      )
    }
  }

  handleMeasure = (ox, oy, width, height, px, py) => {
    this.setState({
      xCenter: px + (this.props.dialRadius + this.props.btnRadius),
      yCenter: py + (this.props.dialRadius + this.props.btnRadius)
    })
  }

  handleMeasure2 = (ox, oy, width, height, px, py) => {
    this.setState({
      xCenter2: px + (this.props.dialRadius2 + this.props.btnRadius2),
      yCenter2: py + (this.props.dialRadius2 + this.props.btnRadius2)
    })
  }

  doStuff = () => {
    this.refs.circleslider.measure(this.handleMeasure)
    this.doStuff2
  }

  doStuff2 = () => {
    this.refs.circleslider.measure(this.handleMeasure2)
  }

  render() {
    let width = (this.props.dialRadius + this.props.btnRadius) * 2
    let bR = this.props.btnRadius
    let dR = this.props.dialRadius
    let startCoord = this.polarToCartesian(this.props.startCoord)
    let endCoord = this.polarToCartesian(this.state.angle)

    let width2 = (this.props.dialRadius2 + this.props.btnRadius2) * 2
    let bR2 = this.props.btnRadius2
    let dR2 = this.props.dialRadius2
    let startCoord2 = this.polarToCartesian2(this.props.startCoord2)
    let endCoord2 = this.polarToCartesian2(this.state.angle2)

    return (
      <View>
        <Svg
          onLayout={this.doStuff}
          ref="circleslider"
          width={width}
          height={width}
        >
          <Defs>
            <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={this.props.startGradient} />
              <Stop offset="100%" stopColor={this.props.endGradient} />
            </LinearGradient>
          </Defs>
          <Circle
            r={dR}
            cx={width / 2}
            cy={width / 2}
            stroke={this.props.backgroundColor}
            strokeWidth={this.props.pathWidth}
            fill="none"
          />
          <Text
            x={width / 2}
            y={width / 2}
            fontSize={this.props.textSize}
            fill={this.props.textColor}
            textAnchor="middle"
          >
            {this.props.showValue && this.state.angle + ''}
          </Text>
          <Path
            stroke={'url(#gradient1)'}
            strokeWidth={this.props.dialWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${
              (this.props.startCoord + 180) % 360 > this.state.angle ? 0 : 1
            } 1 ${endCoord.x} ${endCoord.y}`}
          />

          <G x={endCoord.x - bR} y={endCoord.y - bR}>
            <Circle
              r={bR - 2}
              cx={bR}
              cy={bR}
              stroke={this.props.btnColor}
              strokeWidth={2}
              fill={'#4850AF'}
              {...this._panResponder.panHandlers}
            />
          </G>
          {/* 2nd circle */}
          <Defs>
            <LinearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={this.props.startGradient2} />
              <Stop offset="100%" stopColor={this.props.endGradient2} />
            </LinearGradient>
          </Defs>
          <Circle
            r={dR2}
            cx={width2 / 2}
            cy={width2 / 2}
            y={(width - width2) / 2}
            x={(width - width2) / 2}
            stroke={this.props.backgroundColor2}
            strokeWidth={this.props.pathWidth2}
            fill="none"
          />
          <Path
            y={(width - width2) / 2}
            x={(width - width2) / 2}
            stroke={'url(#gradient2)'}
            strokeWidth={this.props.dialWidth2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M${startCoord2.x} ${startCoord2.y} A ${dR2} ${dR2} 0 ${
              (this.props.startCoord2 + 180) % 360 > this.state.angle2 ? 0 : 1
            } 1 ${endCoord2.x} ${endCoord2.y}`}
          />

          <G
            x={endCoord2.x - bR2 + (width - width2) / 2}
            y={endCoord2.y - bR2 + (width - width2) / 2}
          >
            <Circle
              r={bR2 - 2}
              cx={bR2}
              cy={bR2}
              stroke={this.props.btnColor2}
              strokeWidth={2}
              fill={'#4850AF'}
              {...this._panResponder2.panHandlers}
            />
          </G>
        </Svg>
      </View>
    )
  }
}

CircleSlider.defaultProps = {
  btnRadius: 13,
  btnColor: 'yellow',
  dialRadius: 130,
  dialWidth: 25,
  pathWidth: 25,
  textColor: 'grey',
  textSize: 50,
  value: 0,
  //xCenter: Dimensions.get('window').width / 2,
  //yCenter: Dimensions.get('window').height / 2,
  showValue: true,
  startGradient: '#12D8FA',
  endGradient: '#A6FFCB',
  backgroundColor: 'white',
  startCoord: 0,
  onValueChange: x => x,
  btnRadius2: 13,
  btnColor2: 'yellow',
  dialRadius2: 130,
  dialWidth2: 25,
  pathWidth2: 25,
  textColor2: 'grey',
  textSize2: 50,
  value2: 0,
  showValue2: true,
  startGradient2: '#12D8FA',
  endGradient2: '#A6FFCB',
  backgroundColor2: 'white',
  startCoord2: 0,
  onValueChange2: x => x
}
