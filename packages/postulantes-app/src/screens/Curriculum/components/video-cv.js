/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React, { Component } from 'react'
import { Content, Card, CardItem, Text, Body, Right, Col, Grid } from 'native-base'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import Config from 'react-native-config'
// import i18n from '../../../i18n'
import { showModal } from '../../../navigation/helpers'

// SERVICES
// import CurriculumService from '../../../api/curriculum-services'
import EditorVideo from '../../../api/upload-video-cv'
// UI-KIT
import { Icon, ButtonUi } from '../../../shared/ui-kit'

// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// CONSTANTES
const BASE_URL_CDN = Config.CDN_URL_VIDEO

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  containerIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  containerTitulo: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40,
    padding: 0,
  },
  titulo: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: 17,
    marginTop: -10,
  },
  defaultText: {
    color: '#666',
    fontWeight: 'normal',
    fontSize: 14,
    marginLeft: 10,
  },

  label: {
    fontSize: 12,
    margin: 3,
    marginLeft: 0,
    marginTop: 1,
    color: '#bdbdbd',
  },
})

class VideoCv extends Component {
  static options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      newVideo: null,
      demo: true,
      videoPath: null,
      stateVideo: true,
    }
  }

  recordVideo = () => {
    EditorVideo.openCamera(this.setUploadVideo)
  }

  openGalery = () => {
    EditorVideo.openGalery(this.setUploadVideo)
  }

  setUploadVideo = video => {
    if (video) {
      this.setState({ newVideo: video, demo: false })
    }
  }

  checkVideo = data => {
    // se toma video del cv
    if (!data.adjuntos.VIDEO_CV) {
      this.setState({
        demo: false,
        videoPath: `http://prepro.api.core.jobs.navent.biz/uploader/v1/retrieve/BM/POSTULANTE/AR/VIDEO?file=${
          data.adjuntos.VIDEO_CV
        }`,
      })
    } else {
      this.setState({
        videoPath: data.genero === 'femenino' ? `${BASE_URL_CDN}ar-femenino.webm ` : `${BASE_URL_CDN}ar-masculino.webm`,
      })
    }
  }

  changeStateVideo = () => {
    const { stateVideo } = this.state
    this.setState({ stateVideo: !stateVideo })
  }

  componentDidMount = async () => {
    const { data } = this.props
    this.checkVideo(data)
  }

  // eslint-disable-next-line consistent-return
  render() {
    // eslint-disable-next-line react/prop-types
    const { videoPath, demo, newVideo } = this.state

    // eslint-disable-next-line no-unused-vars
    const { data } = this.props

    console.log(`VIDEO EN PLAYER ${videoPath}`)
    // console.log('PRUEBA ' + JSON.stringify(data, null, 2))
    return (
      <Content padder style={styles.container}>
        <Card>
          <CardItem header bordered style={styles.containerTitulo}>
            <Body>
              <Text style={styles.titulo}>Video Presentación</Text>
            </Body>
            <Right>
              {// DEMO
              demo ? (
                <TouchableHighlight
                  onPress={() => {
                    this.recordVideo()
                  }}
                >
                  <Icon name="Add-circle" color={DefaultTheme.colors.secondary} size={25} />
                </TouchableHighlight>
              ) : (
                // VIDEO POSTULANTE
                <View style={styles.containerIcons}>
                  <TouchableHighlight
                    onPress={() => {
                      this.recordVideo()
                    }}
                  >
                    <Icon name="delete" color={DefaultTheme.colors.error} size={25} />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      this.recordVideo()
                    }}
                  >
                    <Icon name="Edit-1" color={DefaultTheme.colors.primary} size={25} />
                  </TouchableHighlight>
                </View>
              )}
            </Right>
          </CardItem>
          <CardItem bordered>
            <Grid>
              {/*  <Col>
                <View style={{ height: 300, width: 150, marginRight: 10 }}>
                  {EditorVideo.renderPreview(newVideo || { uri: videoPath, mime: 'video/webm' }, {
                    paused: true,
                    fullscreen: false,
                    controls: false,
                    muted: true,
                    volume: 0,
                    preview: true,
                  })}
                </View>
              </Col> */}
              <Col>
                <Text style={styles.defaultText}>
                  <Text style={{ fontWeight: 'bold' }}>Grabá un video</Text> de 20 segundos contando un poco sobre vos.
                  Resaltá tus fortalezas y mencioná todo lo que no aparece en tu CV.
                </Text>
                <ButtonUi
                  info
                  text={!demo ? 'Ver mi video' : 'Ver ejemplo'}
                  onPress={() => {
                    showModal('MODAL_VIDEO', {
                      video: newVideo || { uri: videoPath, mime: 'video/webm' },
                    })
                  }}
                />
              </Col>
            </Grid>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default VideoCv
