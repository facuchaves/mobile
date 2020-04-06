/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeRadioButtonComponent, makeRedTextError, makeLabel, makeInput, makeCheckmark } from './mixins'

const RadioButtonComponent = styled.div`
  ${props => makeRadioButtonComponent(props)}
`
const RedTextError = styled.i`
  ${props => makeRedTextError(props)}
`
const Input = styled.input`
  ${props => makeInput(props)}
`
const Label = styled.label`
  ${props => makeLabel(props)}
`
const Checkmark = styled.span`
  ${props => makeCheckmark(props)}
`

export const RadioButton = props => {
  const { id, options, disabled, small, register, errors } = props
  const error = errors && errors[id]
  return (
    <>
      {options.map(element => {
        return (
          <RadioButtonComponent>
            <Input small={small} disabled={disabled} type="radio" name={id} value={element.id} ref={register} />
            <Label small={small} disabled={disabled}>
              {element.option}
            </Label>
            <Checkmark small={small} />
          </RadioButtonComponent>
        )
      })}
      {error && <RedTextError>Por favor, seleccioná una opción.</RedTextError>}
    </>
  )
}

RadioButton.propTypes = {
  id: PropTypes.number.isRequired,
  texto: PropTypes.string.isRequired,
  options: PropTypes.shape({ id: PropTypes.number.isRequired, option: PropTypes.string.isRequired }),
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
}

RadioButton.defaultProps = {
  options: [],
  errors: {},
}
