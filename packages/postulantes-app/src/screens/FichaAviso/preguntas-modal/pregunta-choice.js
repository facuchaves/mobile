import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import { RadioButton } from '../../../shared/ui-kit'

const PreguntaChoice = ({ id, texto, opciones, errors, setFieldValue, values }) => {
  const radioProps = opciones.map(e => {
    return { value: e.id, label: e.opcion }
  })

  return (
    <RadioButton
      id={id}
      title={texto}
      radioProps={radioProps}
      errors={errors}
      setFieldValue={setFieldValue}
      values={values}
      errorMessage={i18n.t('validation:error_preguntas_choice')}
    />
  )
}

export default PreguntaChoice

PreguntaChoice.propTypes = {
  id: PropTypes.number.isRequired,
  opciones: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, opcion: PropTypes.string.isRequired }).isRequired
  ).isRequired,
  texto: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  setFieldValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object,
}

PreguntaChoice.defaultProps = {
  errors: {},
  values: {},
}
