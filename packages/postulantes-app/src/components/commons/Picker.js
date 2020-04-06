/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// IMPORTS
import React from 'react'
import { Content, Form, Item, Label, Picker } from 'native-base'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { PropTypes } from 'prop-types'
import i18n from '../../i18n'
import { vw, vh } from '../../style/helpers'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  bloq1: {
    padding: 12,
    margin: 10,
    flex: 1,
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  item: {
    borderBottomWidth: 0,
    borderBottomColor: '#eee',
  },
  label: {
    color: '#bdbdbd',
    fontSize: 14,
    paddingBottom: 5,
  },
  inputPicker: {
    width: vw(320),
    marginTop: 0,
    marginLeft: 0,
    color: '#757575',
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
  },

  PickerTextPlaceholder: {
    width: width * 0.95,
    color: '#757575',
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    marginTop: 5,
    marginLeft: 0,
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
  },
  errorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 3,
    marginLeft: -3,
    paddingLeft: 5,
  },
})

const PickerUi = ({ label, enable, icons, placeholder, setFieldValue, value, setFieldTouched }) => {
  return (
    <Item stackedLabel style={styles.item}>
      <Label style={styles.label}>
        {i18n.t('curriculum:idiomas:idiomas')}
        <Text style={styles.asterisco}>*</Text>
      </Label>
      <View style={{ backgroundColor: 'red', height: 40, borderRadius: 8 }}>
        <Picker
          mode="dialog"
          iosIcon={<Icon name="arrow-down" />}
          style={styles.inputPicker}
          placeHolderText={i18n.t('curriculum:idiomas:select_option')}
          placeholderStyle={styles.PickerTextPlaceholder}
          placeholderIconColor="#007aff"
          selectedValue={value}
          onValueChange={setFieldValue}
          enabled={enable}
        >
          <Picker.Item label={i18n.t('curriculum:idiomas:select_option')} value={null} />
          {option}
        </Picker>
      </View>
    </Item>
  )
}

/**
 * PropTypes
 */

PickerUi.propTypes = {}

PickerUi.defaultProps = {}

/**
 * Exports
 */

export default PickerUi
