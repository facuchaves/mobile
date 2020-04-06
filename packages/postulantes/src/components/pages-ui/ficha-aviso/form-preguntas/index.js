import React from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import PreguntasUI from './preguntas-ui'

export { HeaderPreguntas } from './header-ui'

export const FormPreguntas = ({ onPostularClick, onClose, preguntas }) => {
  const { register, errors, handleSubmit, triggerValidation } = useForm({
    mode: 'onChange',
  })

  const postularHandler = async formData => {
    const valid = await triggerValidation()
    if (valid) {
      const respuestas = formData
        ? Object.keys(formData).map(e => {
            return { preguntaId: e, respuesta: formData[e] }
          })
        : []
      onPostularClick({ respuestas })
    }
  }
  return (
    <PreguntasUI
      onPostularClick={handleSubmit(postularHandler)}
      preguntas={preguntas}
      register={register}
      errors={errors}
      onClose={onClose}
    />
  )
}

FormPreguntas.propTypes = {
  onPostularClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  preguntas: PropTypes.arrayOf(PropTypes.object),
}

FormPreguntas.defaultProps = {
  preguntas: null,
}
