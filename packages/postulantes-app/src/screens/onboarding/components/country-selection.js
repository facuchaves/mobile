import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import DefaultTheme from '../../../themes/DefaultTheme'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import { vw } from '../../../style/helpers'

/*
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    marginBottom: vw(30),
    paddingHorizontal: vw(36),
    paddingTop: vw(24),
    borderRadius: vw(8),
    backgroundColor: DefaultTheme.colors.surface,
    elevation: 0,
  },

  countryContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: vw(16),
    borderColor: DefaultTheme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    width: vw(288),
    paddingHorizontal: vw(16),
  },

  text: {
    fontSize: vw(16),
    paddingLeft: vw(16),
  },

  icon: {
    width: vw(20),
    height: vw(20),
  },

  line: {
    borderBottomColor: DefaultTheme.colors.disabledBackground,
    borderBottomWidth: 1,
  },
})

const CountrySelection = ({ data, onCountrySelect }) => {
  return (
    <View style={styles.container}>
      {data.map(item => {
        return (
          <View key={item.countryCode}>
            <ThrottledTouchableOpacity onPress={() => onCountrySelect(item)}>
              <View style={styles.countryContainer}>
                <Image source={item.iconSource} />
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </ThrottledTouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

/*
 * PropTypes
 */

CountrySelection.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onCountrySelect: PropTypes.func.isRequired,
}

/*
 * Exports
 */

export default CountrySelection
