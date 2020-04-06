import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FieldContainer, Field } from '..'
import {
  makeFieldBefore,
  makeFieldAfter,
  makeTextareaField,
  makeHelperLine,
  makeHelperText,
  makeCharacterCounter,
  makeErrorMessage,
} from './mixins'

const FieldBefore = styled.div`
  ${props => makeFieldBefore(props)}
`
const FieldAfter = styled.div`
  ${props => makeFieldAfter(props)}
`
const TextareaField = styled.textarea`
  ${props => makeTextareaField(props)}
`
const HelperLine = styled.div`
  ${props => makeHelperLine(props)}
`
const HelperText = styled.span`
  ${props => makeHelperText(props)}
`
const CharacterCounter = styled.span`
  ${props => makeCharacterCounter(props)}
`
const ErrorMessage = styled.span`
  ${props => makeErrorMessage(props)}
`

export class Textarea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      fieldValue: '',
      charactersCount: 0,
      height: 200,
    }
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props

    if (errors !== prevProps.errors) {
      this.updateState(this.props)
    }
  }

  onChange = event => {
    const charactersCount = event.target.value === '' ? this.state.charactersCount : event.target.value.length

    this.setState({
      fieldValue: event.target.value,
      charactersCount,
    })
  }

  resize = event => {
    this.setState({
      height: event.target.scrollHeight,
    })
  }

  updateState(params) {
    const { errors, name } = params

    this.setState({
      error: errors && errors[name],
      errorMessage: errors && errors[name] ? errors[name].message : '',
    })
  }

  render() {
    const {
      lighten,
      before,
      after,
      small,
      disabled,
      type,
      name,
      placeholder,
      helperText,
      maxLength,
      validation,
    } = this.props
    const { error, errorMessage, fieldValue, height } = this.state

    const withContent = fieldValue ? 'with-content' : 'without-content'
    const withError = error ? `with-error ${name}-with-error` : `without-error ${name}-without-error`

    return (
      <FieldContainer>
        <Field className={`${withError} ${withContent}`}>
          {before && <FieldBefore>{before}</FieldBefore>}
          <TextareaField
            lighten={lighten}
            small={small}
            disabled={disabled}
            id={`${name}-input`}
            name={name}
            type={type}
            onInput={this.resize}
            autoCorrect="on"
            autoComplete="on"
            spellcheck="false"
            maxLength={maxLength}
            cols="20"
            rows="1"
            placeholder={placeholder}
            style={{ height: `${height}px` }}
            ref={validation}
            onChange={this.onChange}
          />
          {after && <FieldAfter>{after}</FieldAfter>}
        </Field>

        {(helperText || maxLength || error) && (
          <HelperLine>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {helperText && !error && <HelperText>{helperText}</HelperText>}
            {maxLength && (
              <CharacterCounter>
                {this.state.charactersCount} / {maxLength}
              </CharacterCounter>
            )}
          </HelperLine>
        )}
      </FieldContainer>
    )
  }
}

Textarea.propTypes = {
  lighten: PropTypes.bool,
  before: PropTypes.string,
  after: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  maxLength: PropTypes.number,
  validation: PropTypes.func,
  errors: PropTypes.func,
}

Textarea.defaultProps = {
  lighten: false,
  before: '',
  after: '',
  small: false,
  disabled: false,
  type: 'text',
  helperText: '',
  maxLength: null,
  validation: null,
  errors: null,
}
