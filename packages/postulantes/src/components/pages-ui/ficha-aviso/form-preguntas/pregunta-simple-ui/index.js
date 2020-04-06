import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@navent-jobs/ui-kit'

const PreguntaSimple = ({ id, texto, register, errors }) => {
  return (
    <>
      <div>{<h3>{texto}</h3>}</div>
      <div>
        <Input
          type="text"
          name={`${id}`}
          label="Respuesta"
          errors={errors}
          validation={register({ required: true, maxLength: 100 })}
        />
      </div>
    </>
  )
}

export default PreguntaSimple

PreguntaSimple.propTypes = {
  id: PropTypes.number.isRequired,
  texto: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

PreguntaSimple.defaultProps = {}
