import { Alert } from 'react-native'

// eslint-disable-next-line react/prop-types
export const Modal = (title, body, textCancel, actionCancel, textConfirm, actionConfirm) => {
  Alert.alert(
    title || null,
    body || null,
    [
      {
        text: textCancel || 'No',
        onPress: actionCancel,
        style: 'cancel',
      },
      { text: textConfirm || 'Sì', onPress: actionConfirm },
    ],
    { cancelable: false }
  )
}
