import { useMemo, useRef, useCallback } from 'react'
import { Dimensions, Animated } from 'react-native'

import DefaultTheme from '../themes/DefaultTheme'

/**
 * Constants
 */

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

const PORTRAIT_BASE_WIDTH = 375
const PORTRAIT_BASE_HEIGHT = 667

const portraitDeviceHeight = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT)
const portraitDeviceWidth = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT)

function vh(value) {
  return (portraitDeviceHeight * value) / PORTRAIT_BASE_HEIGHT
}

function vw(value) {
  return (portraitDeviceWidth * value) / PORTRAIT_BASE_WIDTH
}

const boxShadowStyle = {
  elevation: 3,
  shadowColor: DefaultTheme.colors.shadow,
  shadowOpacity: 1,
  shadowRadius: vw(3),
  shadowOffset: { width: 0, height: vw(5) },
  borderColor: 'transparent',
}

const boxStyle = {
  backgroundColor: DefaultTheme.colors.surface,
  shadowColor: DefaultTheme.colors.shadow,
  shadowOffset: { width: vw(1), height: vw(1) },
  shadowOpacity: 0.3,
  elevation: 2,
  borderRadius: vw(5),
  marginHorizontal: vw(16),
  marginVertical: vw(6),
}

const notificationBoxStyle = {
  backgroundColor: DefaultTheme.colors.surface,
  shadowColor: DefaultTheme.colors.shadow,
  shadowOffset: { width: vw(1), height: vw(1) },
  shadowOpacity: 0.3,
  elevation: 2,
  borderRadius: vw(5),
  marginVertical: vw(6),
}

/*
 * Hooks
 */

const useAnimatedStyles = initialOpacity => {
  const animatedOpacity = useRef(new Animated.Value(initialOpacity)).current

  const fadeIn = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [animatedOpacity])

  const fadeOut = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [animatedOpacity])

  const animatedStyles = useMemo(() => ({ opacity: animatedOpacity }), [animatedOpacity])

  return { animatedStyles, fadeIn, fadeOut }
}

/**
 * Constants
 */
export {
  portraitDeviceHeight,
  portraitDeviceWidth,
  vh,
  vw,
  boxShadowStyle,
  boxStyle,
  notificationBoxStyle,
  useAnimatedStyles,
}
