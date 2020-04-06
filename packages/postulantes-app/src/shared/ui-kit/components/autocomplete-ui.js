/* eslint-disable no-console */
import React from 'react'
import { StyleSheet, View, Dimensions, Text, SafeAreaView } from 'react-native'
import { keyBy } from 'lodash'
import { Autocomplete } from 'react-native-dropdown-autocomplete'
import PropTypes from 'prop-types'
import { Label } from 'native-base'
// THEME
import { vw, vh } from '../../../style/helpers'
import DefaultTheme from '../../../themes/DefaultTheme'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: width * 0.9,
    paddingHorizontal: 0,
  },
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexWrap: 'wrap',
    borderBottomWidth: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'flex-start',
  },
  input: {
    width: vw(335),
    height: vh(54),
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 10,
    borderWidth: 0,
    elevation: 1,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  spinner: {
    color: DefaultTheme.colors.primary,
  },
  boxResult: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 1,
    borderColor: DefaultTheme.colors.border,
    marginLeft: -30,
    width: width * 0.9,
  },
  asterisco: {
    color: '#f00',
  },
})

export const AutocompleteUi = ({ label, initialValue, data, placeholderColor, onValueChange, isValid }) => {
  const dataByKey = keyBy(data, 'nombre')
  return (
    <View style={styles.autocompletesContainer}>
      <SafeAreaView style={styles.container}>
        <Label style={styles.label}>
          {label} <Text style={styles.asterisco}>*</Text>
        </Label>
        <Autocomplete
          minimumCharactersCount={2}
          initialValue={initialValue} // REQUIERE STRING INICIAL
          data={data}
          valueExtractor={item => item.nombre}
          handleSelectItem={selectValue => {
            onValueChange(selectValue.id)
          }}
          onChangeText={selectValue => {
            const valueValidate = dataByKey[selectValue]
            if (!valueValidate) {
              onValueChange(null)
            }
          }}
          // onDropdownShow={() => onDropdownShow()}
          listHeader={null}
          placeholder={placeholderColor}
          placeholderColor="#ccc"
          /*  rightContent 
          rightTextExtractor={item => item.properties} */
          inputContainerStyle={styles.inputContainer}
          highlightText
          highLightColor={DefaultTheme.colors.primary}
          inputStyle={[styles.input, isValid && styles.inputError]}
          listHeaderTextStyle={{ color: 'red' }}
          listFooterStyle={{ display: 'none' }}
          listHeaderStyle={null}
          pickerStyle={{ width: width * 0.8 }}
          spinnerStyle={styles.spinner}
          scrollStyle={styles.boxResult}
        />
      </SafeAreaView>
    </View>
  )
}

// label, initialValue, data, placeholderColor
AutocompleteUi.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholderColor: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
}

AutocompleteUi.defaultProps = {
  label: null,
}
