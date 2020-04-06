import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { vw, vh } from '../../style/helpers'

/**
 * Constants
 */

const HIT_SLOP = { top: vh(10), bottom: vh(10), left: vw(10), right: vw(10) }

/**
 * ThrottledTouchableOpacity
 */

const ThrottledTouchableOpacity = props => {
  const { testID, onPress, throttleInterval } = props

  const handleOnPress = throttle(onPress, throttleInterval, {
    trailing: false,
  })

  return <TouchableOpacity {...props} hitSlop={HIT_SLOP} onPress={handleOnPress} testID={testID} />
}

/**
 * PropTypes
 */

ThrottledTouchableOpacity.propTypes = {
  ...TouchableOpacity.propTypes,
  throttleInterval: PropTypes.number,
  testID: PropTypes.string,
}

ThrottledTouchableOpacity.defaultProps = {
  ...TouchableOpacity.defaultProps,
  activeOpacity: 0.6,
  throttleInterval: 1500,
  onPress: () => {},
}

/**
 * Exports
 */

export default ThrottledTouchableOpacity
