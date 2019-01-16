/* Source from stssoftware
 * https://github.com/stssoftware/react-native-svg-circular-progress
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function generateArc(percentage, radius) {
  if (percentage === 100) percentage = 99.999
  const a = (percentage * 2 * Math.PI) / 100 // angle (in radian) depends on percentage
  const r = radius // radius of the circle
  var rx = r,
    ry = r,
    xAxisRotation = 0,
    largeArcFlag = 1,
    sweepFlag = 1,
    x = r + r * Math.sin(a),
    y = r - r * Math.cos(a)
  if (percentage <= 50) {
    largeArcFlag = 0
  } else {
    largeArcFlag = 1
  }

  return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
}

class CircularProgress extends React.Component {
  render() {
    let half = this.props.size / 2
    let half2 = (this.props.size - 50) / 2

    return (
      <View style={{ width: this.props.size, height: this.props.size }}>
        <Svg width={this.props.size} height={this.props.size}>
          <Circle cx={half} cy={half} r={half} fill={this.props.blankColor} />
          <Path
            d={`M${half} ${half} L${half} 0 ${generateArc(
              this.props.percentage,
              half
            )} Z`}
            fill={this.props.donutColor}
          />
          {
            <Circle
              cx={half}
              cy={half}
              r={this.props.progressWidth}
              fill={this.props.fillColor}
            />
          }
        </Svg>
        <View style={styles.textView}>{this.props.children}</View>
      </View>
    )
  }
}

CircularProgress.defaultProps = {
  percentage: 40,
  blankColor: '#eaeaea',
  donutColor: '#43cdcf',
  fillColor: 'white',
  progressWidth: 35,
  size: 100
}

export default CircularProgress
