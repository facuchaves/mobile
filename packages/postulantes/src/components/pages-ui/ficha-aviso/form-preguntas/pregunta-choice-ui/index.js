import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton } from '@navent-jobs/ui-kit'

const PreguntaChoice = ({ id, texto, opciones, register, errors }) => {
  return (
    <>
      <div>
        <h3>
          {texto}
          {errors && <span style={{ color: 'red' }}>*</span>}
        </h3>
      </div>
      <RadioButton
        {...{
          id,
          options: opciones.map(e => {
            return { id: e.id, option: e.opcion }
          }),
          register: register({ required: true }),
          errors,
        }}
      />
    </>
  )
}

export default PreguntaChoice

PreguntaChoice.propTypes = {
  id: PropTypes.number.isRequired,
  texto: PropTypes.string.isRequired,
  opciones: PropTypes.shape({ id: PropTypes.number.isRequired, opcion: PropTypes.string.isRequired }).isRequired,
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
}

PreguntaChoice.defaultProps = {
  errors: {},
}
