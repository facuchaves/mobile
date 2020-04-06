/* eslint-disable */
import React, { Component } from 'react'
import RecordRTC from 'recordrtc'
import './VideoRecorder.css'
import recImg from '../../assets/images/rec.png'
import stopImg from '../../assets/images/stop.png'
import redoImg from '../../assets/images/redo.png'

const hasGetUserMedia = !!(
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
)

class VideoRecorder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recordVideo: null,
      srcObject: undefined,
      uploadSuccess: null,
      uploading: false,
      estadoGrabacion: '',
      showStart: true,
      estadoReproduccion: false,
    }

    this.requestUserMedia = this.requestUserMedia.bind(this)
    this.captureUserMedia = this.captureUserMedia.bind(this)
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
  }

  componentDidMount() {
    if (!hasGetUserMedia) {
      alert('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.')
      return
    }
    this.requestUserMedia()
  }

  // handle user media capture
  captureUserMedia(callback) {
    const params = { audio: false, video: true }

    navigator.getUserMedia(params, callback, error => {
      alert(JSON.stringify(error))
    })
  }

  requestUserMedia() {
    console.log('requestUserMedia')
    this.captureUserMedia(stream => {
      const video = document.querySelector('video')
      video.srcObject = stream
      // this.setState({ srcObject: stream });
      console.log('setting state', this.state)
    })
  }

  startRecord() {
    this.setState({ estadoReproduccion: false })
    this.requestUserMedia()
    this.captureUserMedia(stream => {
      this.state.recordVideo = RecordRTC(stream, {
        type: 'video',
      })
      this.state.recordVideo.startRecording()
      this.setState({ estadoGrabacion: 'grabando' })
      this.setState({ showStart: false })
    })
    if (document.getElementById('videoCreatedLink')) {
      const element = document.getElementById('videoCreatedLink')
      element.parentNode.removeChild(element)
    }
  }

  stopRecord() {
    this.setState({ showStart: true })
    this.state.recordVideo.stopRecording(() => {
      const params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random() * 90000) + 10000,
      }
      this.downloadVideo(params.data)
      this.setState({ estadoGrabacion: 'parado' })
      // document.querySelector("video").srcObject = undefined;
    })
  }

  setStreamToVideo(stream) {
    const video = this.refs.app.querySelector('video')

    video.srcObject = stream
  }

  downloadVideo(blob) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    // a.style.display = "none";
    a.href = url
    a.target = '_blank'
    a.id = 'videoCreatedLink'
    a.className = 'btn btn-empty'
    const btnContainer = document.getElementById('btns-dock')
    // btnContainer.appendChild(a);
    btnContainer.insertBefore(a, btnContainer.firstChild)
    // document.body.appendChild(a);
    const videoCreated = document.getElementById('videoCreatedLink')
    videoCreated.setAttribute('download', 'true')
    videoCreated.innerHTML = 'Descargar video'
    // a.click();
    // var video = document.querySelector("video");
    const video = document.getElementById('videoElement')
    video.srcObject = undefined
    video.src = url
    video.load()
    video.onloadeddata = function() {
      video.play()
    }
    this.setState({ estadoReproduccion: true })
  }

  render() {
    return (
      <div className="video-recorder-component">
        <div className="video-recorder-container">
          <h1>Video</h1>
          <p>
            Grabá un video de presentación contando algo sobre vos, qué es lo que más te gusta hacer, y que expectativas
            laborales tenés.
          </p>
          <div className="video-recorder">
            <video autoPlay muted id="videoElement" />
            {!this.state.estadoReproduccion ? (
              <div className="video-recorder-actions">
                {this.state.showStart ? (
                  <button onClick={this.startRecord} className="recBtn">
                    <img src={recImg} className="" alt="" />
                    <span>Comenzar a grabar</span>
                  </button>
                ) : (
                  <button onClick={this.stopRecord} className="stopBtn">
                    <img src={stopImg} className="" alt="" />
                    <span>Parar</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="video-recorder-actions">
                <button onClick={this.startRecord} className="redoBtn">
                  <img src={redoImg} className="" alt="" />
                  <span>Rehacer</span>
                </button>
              </div>
            )}
            <input type="hidden" value={this.state.estadoGrabacion} />
            <div className="video-recorder-btn" id="btns-dock">
              <button onClick={this.uploadRecord} className="btn btn-empty btn-cancelar">
                CANCELAR
              </button>
              <button onClick={this.uploadRecord} className="btn btn-primary btn-guardar">
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoRecorder
