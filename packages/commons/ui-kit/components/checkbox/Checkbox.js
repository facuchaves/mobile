/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeCheckboxComponent, makeRedTextError, makeLabel, makeInput, makeCheckmark } from './mixins'

const CheckboxComponent = styled.div`
  ${props => makeCheckboxComponent(props)}
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

export const Checkbox = props => {
  const { id, options, disabled, small, register, errors } = props
  const error = errors && errors[id]
  return (
    <>
      {options.map(element => {
        return (
          <CheckboxComponent>
            <Input small={small} disabled={disabled} type="checkbox" name={id} value={element.id} ref={register} />
            <Label small={small} disabled={disabled}>
              {element.option}
            </Label>
            <Checkmark small={small} />
          </CheckboxComponent>
        )
      })}
      {error && <RedTextError>Por favor, seleccioná una opción.</RedTextError>}
    </>
  )
}

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  options: PropTypes.shape({ id: PropTypes.number.isRequired, option: PropTypes.string.isRequired }),
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
}

Checkbox.defaultProps = {
  options: [],
  disabled: false,
  small: false,
  errors: {},
}
