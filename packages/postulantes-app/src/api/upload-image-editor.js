/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { NativeModules, Alert } from 'react-native'
import DefaultTheme from '../themes/DefaultTheme'

// CONSTANTES
const ImagePicker = NativeModules.ImageCropPicker
const EditorImage = {}

const state = {
  image: null,
}

// eslint-disable-next-line consistent-return
const cropImage = bindImageAvatar => {
  const { image } = state

  if (!image) {
    return Alert('No image', 'Before open cropping only, please select image')
  }

  ImagePicker.openCropper({
    path: image.uri,
    width: 500,
    height: 500,
    compressImageMaxWidth: 500,
    compressImageMaxHeight: 500,
    compressImageQuality: 0.5,
    cropperToolbarTitle: 'EDITOR AVATAR',
    cropperCircleOverlay: true,
    forceJpg: true,
    includeBase64: true,
    cropperToolbarColor: DefaultTheme.colors.primary,
  })
    .then(imageCrop => {
      try {
        bindImageAvatar(imageCrop)
      } catch (e) {
        console.log(e)
        Alert.alert(e.message ? e.message : e)
      }
    })
    .catch(e => {
      console.log(e)
      Alert.alert(e.message ? e.message : e)
    })
}

EditorImage.openCamera = (cropping, bindImageAvatar, mediaType = 'photo') => {
  ImagePicker.openCamera({
    cropping,
    width: 500,
    height: 500,
    includeExif: true,
    mediaType,
    cropperToolbarTitle: 'EDITOR AVATAR',
    cropperCircleOverlay: true,
    useFrontCamera: true,
  })
    .then(image => {
      state.image = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

      cropImage(bindImageAvatar)
    })
    .catch(e => Alert(e))
}

EditorImage.openGalery = bindImageAvatar => {
  ImagePicker.openPicker({
    mediaType: 'image',
  })
    .then(image => {
      state.image = { uri: image.path, width: image.width, height: image.height, mime: image.mime }

      cropImage(bindImageAvatar)
    })
    .catch(e => Alert(e))
}

EditorImage.cleanupImage = imageToClean => {
  console.log('will cleanup image', imageToClean)

  ImagePicker.cleanSingle(imageToClean ? imageToClean.uri : null)
    .then(() => {
      console.log(`removed tmp imageToClean ${imageToClean.uri} from tmp directory`)
    })
    .catch(e => {
      Alert(e)
    })
}

EditorImage.cleanupImages = () => {
  ImagePicker.clean()
    .then(() => {
      console.log('removed tmp images from tmp directory')
    })
    .catch(e => {
      Alert(e)
    })
}
/* EditorImage.renderImage = image => {
  return <Image style={{ width: 120, height: 120, borderRadius: 75 }} source={image} />
} */

export default EditorImage
