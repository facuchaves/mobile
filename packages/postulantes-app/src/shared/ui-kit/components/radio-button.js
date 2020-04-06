import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import RadioForm, {
  RadioButton as RadioButtonSimple,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = {
  title: { fontSize: 16, marginBottom: 15, color: DefaultTheme.colors.labelText },
  RBLabel: { fontSize: 14, color: DefaultTheme.colors.primaryText },
  error: { fontSize: 10, color: 'red' },
  view: { marginTop: 15, marginBottom: 15 },
}

export const RadioButton = ({ id, title, radioProps, errors, setFieldValue, values, errorMessage }) => {
  const error = errors[`${id}`]
  return (
    <View style={styles.view}>
      <Text style={styles.title}>
        {title} {error ? <Text style={{ ...styles.title, color: styles.error.color }}>*</Text> : null}
      </Text>
      <RadioForm formHorizontal={false} animation>
        {/* To create radio buttons, loop through your array of options */}
        {radioProps.map(obj => (
          <RadioButtonSimple labelHorizontal key={obj.value}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={obj.id}
              onPress={value => {
                setFieldValue(id, value)
              }}
              borderWidth={2}
              buttonInnerColor={DefaultTheme.colors.primary}
              buttonOuterColor={
                values[`${id}`] === obj.value ? DefaultTheme.colors.primary : DefaultTheme.colors.disabledPrimary
              }
              isSelected={!!(values[`${id}`] === obj.value)}
              buttonSize={11}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 0, marginVertical: 4 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={obj.id}
              labelHorizontal
              onPress={value => {
                setFieldValue(id, value)
              }}
              labelStyle={styles.RBLabel}
              labelWrapStyle={{}}
            />
          </RadioButtonSimple>
        ))}
      </RadioForm>
      {error && <Text style={styles.error}>{errorMessage || i18n.t('validation:error_field_requered')}</Text>}
    </View>
  )
}

RadioButton.propTypes = {
  id: PropTypes.number.isRequired,
  radioProps: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number.isRequired, label: PropTypes.string.isRequired }).isRequired
  ).isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setFieldValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
  errorMessage: PropTypes.string,
}

RadioButton.defaultProps = {
  errorMessage: null,
  errors: {},
  values: {},
}
