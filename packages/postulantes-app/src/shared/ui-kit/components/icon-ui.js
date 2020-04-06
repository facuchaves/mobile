import React from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'

import iconsConfig from '../../../themes/fonts/selection.json'

const IconInit = createIconSetFromIcoMoon(iconsConfig)

export const Icon = props => {
  // eslint-disable-next-line react/prop-types
  const { name, size, color, style, onPress } = props
  return <IconInit name={name} size={size} color={color} style={style} onPress={onPress} />
}

export default Icon
