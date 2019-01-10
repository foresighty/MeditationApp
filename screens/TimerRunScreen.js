import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Platform,
  Animated,
  Easing
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import Sound from 'react-native-sound'
import styled from 'styled-components/native'

import CircularProgress from '../components/CircleProgress'
import MainButton from '../components/UI/MainButton'
import cssGlobalStyles from '../utils/cssGlobalStyles'
import prettyTime from '../utils/prettyTime'

// Enable audio playback in silence mode
Sound.setCategory('Playback')

// Define the 'gong' sound effect
const gong = new Sound('gamelangong.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error)
    return
  }
  // loaded successfully
  console.log(`duration in seconds: ${gong.getDuration()}`)
})

// Animated CircleProgress
const AnimatedCircleProgress = Animated.createAnimatedComponent(
  CircularProgress
)

const MainTimeDisplayText = styled.Text`
  color: white;
  font-size: ${((Dimensions.get('screen').width * 0.75) / 2 - 20) / 3};
  font-family: ${Platform.OS === 'ios' ? 'Arial' : 'normal'};
`

/* Percentage calculation
 * seconds to minutes = seconds / 60 (45 seconds / 60 = 0.75)
 * add this value to the remaining minutes (15 + 0.75 = 15.75)
 * divide by totalMinutes (15.75 / 30 = 0.525)
 * multiply by 100 (52.5)
 */

class TimerRunScreen extends React.Component {
  state = {
    meditationMinutes: this.props.navigation.state.params.meditationMinutes,
    intervalMinutes: this.props.navigation.state.params.intervalMinutes,
    prepSeconds: this.props.navigation.state.params.prepSeconds,
    totalMinutes: this.props.navigation.state.params.meditationMinutes,
    meditationSeconds:
      this.props.navigation.state.params.meditationMinutes * 60,
    isPrepRunning: true,
    percentage: 100,
    animPercentage: new Animated.Value(100)
    // could reset with this.state.percentage.setValue(100)
  }

  timer = 0

  componentDidMount() {
    this.runTimer()
  }

  componentWillUnmount() {
    // reset the gong sound effect.
    gong.pause().setCurrentTime(0)
    this.stopTimer()
  }

  // Main Timer Function
  // Uses react-native-background-timer in order to keep the clock running when the app in not in the foreground
  runTimer = () => {
    BackgroundTimer.start()
    timer = BackgroundTimer.setInterval(() => {
      // if (this.state.prepSeconds === 0) {
      //   gong.play(success => {
      //     if (success) {
      //       console.log('Gong finished playing')
      //       //gong.pause()
      //     } else {
      //       console.log('Playback failed')
      //     }
      //   })
      //   BackgroundTimer.clearInterval(timer)
      //   BackgroundTimer.stop()
      //   return
      // }

      // Code for when prep time is running
      if (this.state.prepSeconds > 0) {
        this.setState({
          prepSeconds: this.state.prepSeconds - 1
        })
        // end prep time code and set the isPrepRunning flag to false
      } else if (this.state.prepSeconds === 0 && this.state.isPrepRunning) {
        gong.play()
        this.setState({
          isPrepRunning: false
        })
        // Code for when meditation time is running
      } else if (this.state.meditationSeconds > 0) {
        const updatedPercentage =
          ((this.state.meditationSeconds - 1) / 60 / this.state.totalMinutes) *
          100
        this.animate(updatedPercentage)
        this.setState({
          meditationSeconds: this.state.meditationSeconds - 1,
          percentage: updatedPercentage
        })
      }
    }, 1000)
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(timer)
    BackgroundTimer.stop()
  }

  animate = newPercentage => {
    Animated.timing(this.state.animPercentage, {
      toValue: newPercentage,
      duration: 1000
    }).start()
  }

  formatTime = () => {
    const totalSeconds = this.state.meditationSeconds
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds - minutes * 60

    const formattedTime = `${prettyTime(minutes, '0', 2)}:${prettyTime(
      remainingSeconds,
      '0',
      2
    )}`
    return formattedTime
  }

  render() {
    const { meditationMinutes, intervalMinutes, prepSeconds } = this.state
    const windowWidth = Dimensions.get('screen').width
    console.log((windowWidth * 0.75) / 2 - 20)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cssGlobalStyles.primaryBackgroundColor
        }}
      >
        <AnimatedCircleProgress
          percentage={this.state.animPercentage}
          size={windowWidth * 0.75}
          progressWidth={(windowWidth * 0.75) / 2 - 20}
          blankColor={cssGlobalStyles.sliderBGTint}
          donutColor={cssGlobalStyles.activeTint}
          fillColor={cssGlobalStyles.primaryBackgroundColor}
        >
          <View>
            <MainTimeDisplayText>
              {this.state.isPrepRunning
                ? `${prettyTime(this.state.prepSeconds, '0', 2)}s`
                : this.formatTime()}
            </MainTimeDisplayText>
          </View>
        </AnimatedCircleProgress>
        <Text>{`Interval time: ${intervalMinutes} minutes`}</Text>
        <MainButton
          disabled={false}
          onPress={() => this.props.navigation.navigate('TimerSet')}
        >
          TIMER OPTIONS
        </MainButton>
      </View>
    )
  }
}

export default TimerRunScreen