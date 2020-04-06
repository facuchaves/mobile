/* eslint-disable global-require */
import React from 'react'
import { Text, StyleSheet, ActivityIndicator, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../../themes/colors'
import { vh, vw } from '../../../style/helpers'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import { Icon } from './icon-ui'
import DefaultTheme from '../../../themes/DefaultTheme'

/**
 * Constants
 */

const HIT_SLOP = { top: vh(10), bottom: vh(10), left: vw(10), right: vw(10) }
/*
 * styles
 */

const DefaultStyles = StyleSheet.create({
  baseButton: {
    height: vw(48),
    minWidth: vw(160),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(8),
    marginVertical: 5,
    backgroundColor: DefaultTheme.colors.secondary,
    elevation: 1,
    borderWidth: 0,
  },
  bordered: {
    borderWidth: 1,
    borderColor: DefaultTheme.colors.secondary,
    color: DefaultTheme.colors.secondary,
  },
  baseButtonText: {
    fontSize: vw(16),
    lineHeight: 18,
    fontWeight: '600',
    // fontFamily: DefaultTheme.fonts.primary.medium,
    color: DefaultTheme.colors.textOverPrimary,
  },
  secondaryButtonText: {
    fontSize: vw(16),
    lineHeight: 18,
    fontWeight: '600',
    // fontFamily: DefaultTheme.fonts.primary.medium,
    color: DefaultTheme.colors.secondary,
  },
  disabledText: {
    color: DefaultTheme.colors.white,
  },
  disabledButton: {
    backgroundColor: DefaultTheme.colors.disabledBackground,
    borderWidth: 0,
    elevation: 0,
  },
  loadingButton: {
    opacity: 0.8,
  },
  transparent: {
    backgroundColor: DefaultTheme.colors.transparent,
    elevation: 0,
  },

  transparentText: {
    color: DefaultTheme.colors.primary,
  },

  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
  },

  chevron: {
    tintColor: DefaultTheme.colors.primary,
    marginLeft: vw(12),
    width: vw(20),
    height: vw(20),
  },

  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

/**
 * Custom buttonUi base component.
 */
export const ButtonUi = ({
  disabled,
  transparent,
  bordered,
  loading,
  onPress,
  text,
  styles,
  showsChevron,
  testID,
  iconLeft,
  iconRight,
  numberOfLines,
}) => {
  const hideText = transparent || loading
  return (
    <ThrottledTouchableOpacity
      style={[
        DefaultStyles.baseButton,
        disabled && DefaultStyles.disabledButton,
        transparent && DefaultStyles.transparent,
        loading && DefaultStyles.loadingButton,
        bordered && DefaultStyles.bordered,
        styles && styles.button,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      hitSlop={HIT_SLOP}
    >
      <View style={DefaultStyles.chevronContainer}>
        {!loading && (
          <>
            {iconLeft ? <Icon name={iconLeft} style={styles.icon} /> : null}
            <Text
              style={[
                DefaultStyles.baseButtonText,
                hideText && DefaultStyles.transparentText,
                disabled && DefaultStyles.disabledText,
                bordered && DefaultStyles.secondaryButtonText,
                styles && styles.text,
              ]}
              numberOfLines={numberOfLines}
            >
              {text}
            </Text>

            {iconRight ? <Icon name={iconRight} style={styles.icon} /> : null}
          </>
        )}

        {showsChevron && <Image source={require('../../../images/chevron-right.png')} style={DefaultStyles.chevron} />}
        {loading && (
          <View style={DefaultStyles.activityIndicator}>
            <ActivityIndicator color={Colors.WHITE} size="small" pointerEvents="none" />
          </View>
        )}
      </View>
    </ThrottledTouchableOpacity>
  )
}

/*
 * PropTypes
 */

ButtonUi.propTypes = {
  disabled: PropTypes.bool,
  transparent: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
  bordered: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object,
  showsChevron: PropTypes.bool,
  testID: PropTypes.string,
  iconRight: PropTypes.string,
  iconLeft: PropTypes.string,
  numberOfLines: PropTypes.number,
}

ButtonUi.defaultProps = {
  bordered: false,
  disabled: false,
  transparent: false,
  loading: false,
  testID: null,
  text: null,
  styles: {},
  showsChevron: false,
  iconRight: null,
  iconLeft: null,
  numberOfLines: 0,
}
