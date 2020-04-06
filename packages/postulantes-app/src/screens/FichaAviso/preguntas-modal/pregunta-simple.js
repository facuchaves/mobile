import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { InputUi } from '../../../shared/ui-kit'
import DefaultTheme from '../../../themes/DefaultTheme'
import { vw } from '../../../style/helpers'

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 5,
    marginLeft: 0,
    paddingLeft: 0,
  },
})
const PreguntaSimple = ({ id, texto, values, errors, setFieldValue, setFieldTouched }) => {
  return (
    <View>
      <InputUi
        label={texto}
        required
        transparent
        error={!!errors[id]}
        value={values[id]}
        setFieldValue={itemValue => {
          setFieldValue(id, itemValue)
        }}
        setFieldTouched={() => setFieldTouched(id)}
        autoCompleteType="off"
        keyboardType="default"
        styles={{ inputs: { backgroundColor: DefaultTheme.colors.background, width: vw(325) } }}
      />

      <Text style={styles.errorMessage}>{errors[id]}</Text>
    </View>
  )
}

export default PreguntaSimple

PreguntaSimple.propTypes = {
  id: PropTypes.number.isRequired,
  texto: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
}

PreguntaSimple.defaultProps = {}
