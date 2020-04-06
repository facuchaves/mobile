/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Video from 'react-native-video'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
})

export class VideoPlayer extends Component {
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'cover',
    duration: 0.0,
    currentTime: 0.0,
    paused: false,
  }

  // video: Video

  onLoad = data => {
    this.setState({ duration: data.duration })
  }

  onProgress = data => {
    this.setState({ currentTime: data.currentTime })
  }

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  }

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  }

  onAudioFocusChanged = event => {
    // : { hasAudioFocus }
    // eslint-disable-next-line react/no-unused-state
    this.setState({ paused: !event.hasAudioFocus })
  }

  getCurrentTimePercentage() {
    const { duration, currentTime } = this.state
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration)
    }
    return 0
  }

  renderRateControl(rateValue) {
    const { rate } = this.state
    const isSelected = rate === rateValue

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ rate })
        }}
      >
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>{rate}x</Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeModeValue) {
    const { resizeMode } = this.state
    const isSelected = resizeMode === resizeModeValue

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ resizeMode: resizeModeValue })
        }}
      >
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>{resizeModeValue}</Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volumeValue) {
    const { volume } = this.state
    const isSelected = volume === volumeValue

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ volume: volumeValue })
        }}
      >
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>{volumeValue * 100}%</Text>
      </TouchableOpacity>
    )
  }

  // eslint-disable-next-line react/sort-comp
  onPress() {
    if (this.videoPlayer != null) this.videoPlayer.presentFullscreenPlayer()
  }

  render() {
    /* const flexCompleted = this.getCurrentTimePercentage() * 100
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100 */
    const { paused, volume, resizeMode, muted, rate } = this.state
    // eslint-disable-next-line react/prop-types
    const { videoData, stateVideo } = this.props
    // SOURCE HEADEAR
    /* ∫ */
    return (
      <View style={styles.container}>
        <Video
          ref={ref => {
            this.video = ref
          }}
          source={videoData}
          style={styles.fullScreen}
          rate={rate}
          paused={stateVideo.paused && stateVideo.preview ? paused : stateVideo.paused}
          volume={stateVideo.volume || volume}
          muted={stateVideo.muted || muted}
          pictureInPicture
          controls={stateVideo.controls}
          fullscreen={stateVideo.fullscreen}
          resizeMode={resizeMode}
          // poster="https://images-na.ssl-images-amazon.com/images/I/41c7QHPJCNL.png"
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          // onLoadStart={}
          onAudioBecomingNoisy={this.onAudioBecomingNoisy}
          onAudioFocusChanged={this.onAudioFocusChanged}
          repeat={false}
        />
      </View>
    )
  }
}

export default VideoPlayer
