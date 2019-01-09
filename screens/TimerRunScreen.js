import React from 'react'
import { View, Text } from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
//import KeepAwake from 'react-native-keep-awake'

import MainButton from '../components/UI/MainButton'

class TimerRunScreen extends React.Component {
  state = {
    meditationMinutes: this.props.navigation.state.params.meditationMinutes,
    intervalMinutes: this.props.navigation.state.params.intervalMinutes,
    prepSeconds: this.props.navigation.state.params.prepSeconds
  }

  timer = 0

  componentDidMount() {
    this.runTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  // Main Timer Function
  // Uses react-native-background-timer in order to keep the clock running when the app in not in the foreground
  runTimer = () => {
    BackgroundTimer.start()
    timer = BackgroundTimer.setInterval(() => {
      if (this.state.prepSeconds === 0) {
        BackgroundTimer.clearInterval(timer)
        BackgroundTimer.stop()
        return
      }
      this.setState({
        prepSeconds: this.state.prepSeconds - 1
      })
    }, 1000)
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(timer)
    BackgroundTimer.stop()
  }

  render() {
    const { meditationMinutes, intervalMinutes, prepSeconds } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Timer Run Screen</Text>
        <Text>{`Mediation time: ${meditationMinutes} minutes`}</Text>
        <Text>{`Interval time: ${intervalMinutes} minutes`}</Text>
        <Text>{`Prep time: ${prepSeconds} seconds`}</Text>
        <MainButton
          disabled={false}
          onPress={() => this.props.navigation.navigate('TimerSet')}
        >
          TIMER OPTIONS
        </MainButton>
        {/* <KeepAwake /> */}
      </View>
    )
  }
}

export default TimerRunScreen
