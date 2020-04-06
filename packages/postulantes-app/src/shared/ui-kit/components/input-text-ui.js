/* eslint-disable react/prop-types */
import React from 'react'
import { Item, Input, Label } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import DefaultTheme from '../../../themes/DefaultTheme'
import { vw } from '../../../style/helpers'

const defaultStyles = StyleSheet.create({
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  item: {
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  itemTransparent: {
    elevation: 0,
  },
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    textAlign: 'left',
    paddingBottom: 5,
  },
  inputs: {
    width: vw(310),
    marginLeft: 0,
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    textAlign: 'left',
    // minHeight: 38,
    padding: 0,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 1,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 5,
    marginLeft: 0,
    paddingLeft: 0,
  },
})

export const InputUi = ({
  label,
  required,
  error,
  value,
  setFieldValue,
  setFieldTouched,
  autoCompleteType,
  keyboardType,
  secureTextEntry,
  styles,
  autoFocus,
  stackedLabel,
  floatingLabel,
  disabled,
  placeholder,
  transparent,
}) => {
  const labelStyle = styles ? styles.label || defaultStyles.label : defaultStyles.label
  return (
    <Item
      stackedLabel={stackedLabel}
      floatingLabel={floatingLabel && !stackedLabel}
      style={[defaultStyles.item, styles && styles.item]}
    >
      {label ? (
        <Label style={labelStyle}>
          {label} {required && <Text style={defaultStyles.asterisco}>*</Text>}
        </Label>
      ) : null}
      <Input
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus || false}
        style={[
          defaultStyles.inputs,
          transparent && defaultStyles.itemTransparent,
          error && defaultStyles.errorInput,
          styles && styles.inputs,
        ]}
        value={value}
        onChangeText={setFieldValue}
        onBlur={setFieldTouched}
        autoCompleteType={autoCompleteType || null}
        autoCapitalize="none"
        keyboardType={keyboardType || null}
        disabled={disabled}
        placeholder={placeholder}
        placeholderTextColor={DefaultTheme.colors.label}
      />
    </Item>
  )
}

InputUi.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOfType([PropTypes.object])]),
  required: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  value: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  autoCompleteType: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  styles: PropTypes.oneOfType([PropTypes.object]),
  autoFocus: PropTypes.bool,
  stackedLabel: PropTypes.bool,
  floatingLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  transparent: PropTypes.bool,
}

InputUi.defaultProps = {
  label: null,
  stackedLabel: true,
  floatingLabel: false,
  disabled: false,
  styles: null,
  value: null,
  secureTextEntry: false,
  autoCompleteType: 'off',
  keyboardType: 'default',
  autoFocus: false,
  placeholder: null,
  transparent: false,
}
