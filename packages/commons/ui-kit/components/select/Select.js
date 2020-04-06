/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactSelect from 'react-select'
import { FieldContainer, Field } from '..'

// eslint-disable-next-line import/no-extraneous-dependencies
import { makeFieldBefore, makeSelect, makeHelperLine, makeHelperText, makeErrorMessage } from './mixins'

const FieldBefore = styled.div`
  ${props => makeFieldBefore(props)}
`
const SelectField = styled(ReactSelect)`
  ${props => makeSelect(props)}
`
const HelperLine = styled.div`
  ${props => makeHelperLine(props)}
`
const HelperText = styled.span`
  ${props => makeHelperText(props)}
`
const ErrorMessage = styled.span`
  ${props => makeErrorMessage(props)}
`

export const Select = props => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldValue, setFieldValue] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const {
    lighten,
    before,
    disabled,
    small,
    name,
    errors,
    placeholder,
    setValue,
    triggerValidation,
    helperText,
    options,
    validation,
    isClearable,
    isSearchable,
    isLoading,
    isRtl,
  } = props

  const onChange = async option => {
    setFieldValue(option.value)
    setValue(name, option.value)
    await triggerValidation({ name })
  }

  const openSelect = () => {
    setIsOpened(!isOpened)
  }

  const updateState = async () => {
    setError(errors && errors[name])
    setErrorMessage(errors && errors[name] ? errors[name].message : '')
  }

  const useUpdateErrorChange = useEffect(() => {
    updateState(props)
  }, [errors, props, updateState])

  const useSetValidation = useEffect(() => {
    if (validation) validation({ name })
  }, [name, validation])

  const withContent = fieldValue ? 'with-content' : 'without-content'
  const withError = error ? `with-error ${name}-with-error` : `without-error ${name}-without-error`

  return (
    <FieldContainer>
      <Field className={`${withError} ${withContent}`}>
        {before && <FieldBefore>{before}</FieldBefore>}
        <SelectField
          onClick={openSelect}
          small={small}
          lighten={lighten}
          className={`basic-single ${isOpened || fieldValue ? 'select-opened' : ''}`}
          classNamePrefix="select"
          defaultValue={null}
          isDisabled={disabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          id={`${name}-input`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onMenuOpen={openSelect}
          options={options}
          withBeforeElement={before}
          // ref={validation}
        />
      </Field>

      {(helperText || error) && (
        <HelperLine>
          {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {helperText && !error && <HelperText>{helperText}</HelperText>}
        </HelperLine>
      )}
    </FieldContainer>
  )
}

Select.propTypes = {
  lighten: PropTypes.bool,
  before: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  validation: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  triggerValidation: PropTypes.func.isRequired,
  errors: PropTypes.func,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRtl: PropTypes.bool,
  // eslint-disable-next-line
  options: PropTypes.array.isRequired,
}

Select.defaultProps = {
  lighten: false,
  before: '',
  small: false,
  disabled: false,
  helperText: '',
  validation: null,
  errors: null,
  isClearable: false,
  isSearchable: false,
  isLoading: false,
  isRtl: false,
}
