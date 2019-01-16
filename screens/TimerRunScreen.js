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
 * totalReamainingSeconds / 60 / totalMinues * 100
 * example: where totalRemainingSeconds = 212, totalMinutes = 5
 * 212 / 60 = 3.533333
 * 3.533333 / 5 = 0.706666667
 * 0.706666 * 100 = 70.6 percent
 */

class TimerRunScreen extends React.Component {
  state = {
    //meditationMinutes: this.props.navigation.state.params.meditationMinutes, // is this needed? is seconds enough?
    meditationSeconds:
      this.props.navigation.state.params.meditationMinutes * 60,
    intervalMinutes: this.props.navigation.state.params.intervalMinutes,
    intervalSeconds: this.props.navigation.state.params.intervalMinutes * 60,
    prepSeconds: this.props.navigation.state.params.prepSeconds,
    totalMinutes: this.props.navigation.state.params.meditationMinutes,
    isIntervalSet: this.props.navigation.state.params.intervalMinutes > 0,
    isIntervalFinished: false,
    isPrepRunning: true,
    isPaused: false, // flag to determine if 'play' or 'pause' button is shown
    meditationPercentage: 100,
    meditationAnimPercentage: new Animated.Value(100),
    intervalPercentage: 100,
    intervalAnimPercentage: new Animated.Value(100)
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
    if (this.state.isPaused) {
      this.setState({
        isPaused: false
      })
    }
    BackgroundTimer.start()
    timer = BackgroundTimer.setInterval(() => {
      // Code for when prep time is running
      if (this.state.prepSeconds > 0) {
        this.setState({
          prepSeconds: this.state.prepSeconds - 1
        })
        // end prep time code and set the isPrepRunning flag to false
      } else if (this.state.prepSeconds === 0 && this.state.isPrepRunning) {
        gong.play()
        // make a call to animate the meditation timer when the prep timer finishes
        const updatedPercentage =
          ((this.state.meditationSeconds - 1) / 60 / this.state.totalMinutes) *
          100
        this.animatePercentage(
          this.state.meditationAnimPercentage,
          updatedPercentage
        )
        // make a call to animate the interval timer (if set) when the prep timer finishes
        if (this.state.isIntervalSet) {
          const updatedIntervalPercentage =
            ((this.state.intervalSeconds - 1) /
              60 /
              this.state.intervalMinutes) *
            100
          this.animatePercentage(
            this.state.intervalAnimPercentage,
            updatedIntervalPercentage
          )
        }
        // stop the prep timer
        this.setState({
          isPrepRunning: false
        })

        /* MEDITATION TIMER RUNNING */
      } else if (this.state.meditationSeconds > 0) {
        /*********************
         ** if INTERVAL TIMER
         *************************/
        if (this.state.isIntervalSet && !this.state.isIntervalFinished) {
          //
          // if the interval timer reaches 0 BUT the meditation timer contunues
          // Reset the interval timer
          if (
            this.state.intervalSeconds - 1 === 0 &&
            this.state.meditationPercentage > 0
          ) {
            this.resetIntervalTimer()
          } else {
            // Otherwise, interval runs normally
            let updatedIntervalPercentage = 0
            if (this.state.intervalSeconds !== 0) {
              // subtracting 2 from the seconds 'anticipates' the next second. This way the animation fiishes at 0
              // by the time intervalSeconds reaches 0
              // however, only subtract 1 second if only 1 second remains on the meditation timer
              const secondsToSubtract =
                this.state.intervalSeconds === 1 &&
                this.state.meditationSeconds < 5
                  ? 1
                  : 2
              updatedIntervalPercentage =
                ((this.state.intervalSeconds - secondsToSubtract) /
                  60 /
                  this.state.intervalMinutes) *
                100

              this.animatePercentage(
                this.state.intervalAnimPercentage,
                updatedIntervalPercentage
              )
              this.setState({
                intervalPercentage: updatedIntervalPercentage,
                intervalSeconds: this.state.intervalSeconds - 1
              })
            }
          }
        }
        //
        // Meditation Timer
        let updatedPercentage = 0
        if (this.state.meditationPercentage !== 0) {
          // subtracting 2 from the seconds 'anticipates' the next second. This way the animation fiishes at 0
          // by the meditationSeconds reaches 0
          updatedPercentage =
            ((this.state.meditationSeconds - 2) /
              60 /
              this.state.totalMinutes) *
            100

          this.animatePercentage(
            this.state.meditationAnimPercentage,
            updatedPercentage
          )
          this.setState({
            meditationSeconds: this.state.meditationSeconds - 1,
            meditationPercentage: updatedPercentage
          })
        } else {
          //'All done! run some finish code - play audio and stop backgroundtimer'
          this.animatePercentage(
            this.state.meditationAnimPercentage,
            updatedPercentage
          )
          this.setState({
            meditationSeconds: 0,
            meditationPercentage: 0
          })
          gong.play()
          this.stopTimer()
        }
      }
    }, 1000)
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(timer)
    BackgroundTimer.stop()
  }

  animatePercentage = (targetTimer, newPercentage) => {
    Animated.timing(targetTimer, {
      toValue: newPercentage,
      duration: 1100, // 1100 is smoother?
      easing: Easing.linear
    }).start()
  }

  resetIntervalTimer = () => {
    gong.play()
    const intervalSeconds = this.state.intervalMinutes * 60
    // Does the interval need to keep running?
    // If the reset interval seconds is more than the remaining time on the meditation timer. Stop the interval timer from running any more.
    if (intervalSeconds >= this.state.meditationSeconds) {
      this.state.intervalAnimPercentage.setValue(0)
      this.setState({
        isIntervalFinished: true
      })
      return
    }
    //
    // Reset the interval timer
    const newPercentage =
      (intervalSeconds / 60 / this.state.intervalMinutes) * 100
    this.state.intervalAnimPercentage.setValue(newPercentage)

    const nextPercentage =
      ((intervalSeconds - 1) / 60 / this.state.intervalMinutes) * 100
    this.animatePercentage(this.state.intervalAnimPercentage, nextPercentage)
    this.setState({
      intervalPercentage: newPercentage,
      intervalSeconds
    })
  }

  pauseTimer = () => {
    this.stopTimer()
    this.setState({
      isPaused: true
    })
    // interval and meditation percentage is one tick too far. (low)
    // however, the animation is smooth when the clock resumes... so I like it?
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
    const windowWidth = Dimensions.get('screen').width
    const meditationProgressSize = windowWidth * 0.75 // The diameter of the circular meditation progress bar
    const meditationProgressWidth = meditationProgressSize / 2 - 15 // The width of the circular meditation bar -- last digit is the pixel width
    const intervalProgressSize = meditationProgressSize - 50 // interval timer
    const intervalProgressWidth = intervalProgressSize / 2 - 5 // interval timer

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: cssGlobalStyles.primaryBackgroundColor
        }}
      >
        {/* Meditation Timer Circle Progress Bar */}
        <AnimatedCircleProgress
          percentage={this.state.meditationAnimPercentage}
          size={meditationProgressSize}
          progressWidth={meditationProgressWidth}
          blankColor={cssGlobalStyles.sliderBGTint}
          donutColor={cssGlobalStyles.sliderMeditationTint}
          fillColor={cssGlobalStyles.primaryBackgroundColor}
        >
          {/* Nested Interval Timer Progress Bar */}
          <AnimatedCircleProgress
            percentage={this.state.intervalAnimPercentage}
            size={intervalProgressSize}
            progressWidth={intervalProgressWidth}
            blankColor={cssGlobalStyles.sliderBGTint}
            donutColor={cssGlobalStyles.sliderIntervalTint}
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
        </AnimatedCircleProgress>
        <View style={{ margin: 25 }} />
        {this.state.isPaused ? (
          <MainButton onPress={() => this.runTimer()}>RUN TIMER</MainButton>
        ) : (
          <MainButton onPress={() => this.pauseTimer()}>PAUSE</MainButton>
        )}
        <MainButton onPress={() => this.props.navigation.navigate('TimerSet')}>
          TIMER OPTIONS
        </MainButton>
      </View>
    )
  }
}

export default TimerRunScreen
