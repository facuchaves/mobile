import React from 'react'
import { Item, Textarea, Label } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { vw } from '../../../style/helpers'

const defaultStyles = StyleSheet.create({
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 0,
    marginTop: 1,
    color: DefaultTheme.colors.labelText,
  },
  itemTextArea: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: vw(310),
    borderBottomWidth: 0,
  },
  textarea: {
    width: vw(310),
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
    marginTop: 15,
  },
  textCount: {
    fontSize: 11,
    color: '#ccc',
    alignSelf: 'flex-end',
    margin: 3,
    position: 'relative',
    top: -22,
  },
  errorTextArea: {
    borderColor: DefaultTheme.colors.error,
    borderWidth: 1,
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

export const TextArea = ({
  label,
  placeholder,
  maxLength,
  rowSpan,
  error,
  value,
  onChangeText,
  setFieldTouched,
  styles,
  disabled,
  required,
}) => {
  return (
    <Item stackedLabel bordered={false} style={[defaultStyles.itemTextArea, styles && styles.itemTextArea]}>
      {label ? (
        <Label style={[defaultStyles.label, styles && styles.label]}>
          {label}
          {required && <Text style={defaultStyles.asterisco}> *</Text>}
        </Label>
      ) : null}
      <Textarea
        style={[defaultStyles.textarea, error && defaultStyles.errorTextArea, styles && styles.TextArea]}
        rowSpan={rowSpan || 5}
        bordered={false}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value ? String(value) : ''}
        onChangeText={onChangeText}
        onBlur={setFieldTouched}
        disabled={disabled}
        placeholderTextColor={DefaultTheme.colors.label}
      />
      <Text style={[defaultStyles.textCount, styles && styles.textCount]}>
        {value ? value.length : 0} / {maxLength}
      </Text>
    </Item>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  rowSpan: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onChangeText: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  styles: PropTypes.oneOfType([PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
}

TextArea.defaultProps = {
  label: null,
  rowSpan: 5,
  disabled: false,
  required: false,
  error: false,
}
