/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import { NativeModules, Alert } from 'react-native'
// eslint-disable-next-line import/named
import { VideoPlayer } from '../shared/ui-kit'

// CONSTANTES
const ImagePicker = NativeModules.ImageCropPicker
const EditorVideo = {}

EditorVideo.openCamera = setNewVideo => {
  ImagePicker.openCamera({
    mediaType: 'video',
    useFrontCamera: true,
  })
    .then(video => {
      const videoObj = { uri: video.path, width: video.width, height: video.height, mime: video.mime }
      setNewVideo(videoObj)
    })
    .catch(e => Alert(e))
}

EditorVideo.openGalery = setNewVideo => {
  ImagePicker.openPicker({
    mediaType: 'video',
  })
    .then(video => {
      const videoObj = { uri: video.path, width: video.width, height: video.height, mime: video.mime }
      setNewVideo(videoObj)
    })
    .catch(e => Alert(e))
}

/* EditorVideo.openCamera = setNewVideo => {
  ImagePicker.openCamera({
    cropping: false,
    width: 500,
    height: 500,
    includeExif: true,
    enableRotationGesture: false,
    // compressVideoPreset,
    mediaType: 'video',
    useFrontCamera: true,
  })
    .then(video => {
      console.log('received VIDEO', video)
      const videoObj = { uri: video.path, width: video.width, height: video.height, mime: video.mime }

      setNewVideo(videoObj)
    })
    .catch(e => console.log(e))
} */

EditorVideo.renderVideo = (video, stateVideo) => {
  const sourceDefault = { uri: video.uri, type: video.mime }

  return <VideoPlayer videoData={sourceDefault} stateVideo={stateVideo} />
}

EditorVideo.renderPreview = (video, stateVideo) => {
  const sourceDefault = { uri: video.uri, type: video.mime }
  return <VideoPlayer videoData={sourceDefault} stateVideo={stateVideo} />
}

export default EditorVideo
