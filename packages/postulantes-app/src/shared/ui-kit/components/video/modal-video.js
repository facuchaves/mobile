/* eslint-disable no-console */
import React, { Component } from 'react'
// import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Body } from 'native-base'
import { dismissModal } from '../../../../navigation/helpers'
import DefaultTheme from '../../../../themes/DefaultTheme'
import EditorVideo from '../../../../api/upload-video-cv'

// UI
// import { Icon } from '../..'

export default class ModalVideo extends Component {
  dismissModal = () => {
    // eslint-disable-next-line react/prop-types
    const { componentId } = this.props
    dismissModal(componentId)
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { video } = this.props
    console.log(`VIDEO ${JSON.stringify(video, null, 2)}`)
    return (
      <Container style={{ background: 'transparent' }}>
        {/* <TouchableOpacity
          onPress={() => this.dismissModal()}
          style={{
            position: 'absolute',
            top: 25,
            left: 15,
            background: 'transparent',
            borderWidth: 1,
            borderRadius: 20,
          }}
        >
          <Icon name="Close" color="white" size={25} />
        </TouchableOpacity> */}
        <Header style={{ backgroundColor: DefaultTheme.colors.primary }}>
          <Left>
            <Button transparent onPress={() => this.dismissModal()}>
              <Icon name="close-circle-outline" />
            </Button>
          </Left>
          <Body>
            <Title>Video Presentacion</Title>
          </Body>
        </Header>
        {/*   <ButtonUi
          iconRight="Close"
          onPress={() => this.dismissModal()}
          styles={{
            icon: { fontSize: 25, color: 'white' },
            button: {
              position: 'absolute',
              top: 25,
              left: 15,
              background: 'transparent',
              borderWidth: 1,
              borderRadius: 20,
            },
          }}
        /> */}

        {EditorVideo.renderVideo(video, {
          paused: false,
          fullscreen: false,
          muted: false,
          controls: true,
          preview: false,
        })}
      </Container>
    )
  }
}
