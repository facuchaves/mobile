import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FieldContainer, Field, Icon } from '..'
import {
  makeFieldBefore,
  makeFieldAfter,
  makeInputText,
  makeHelperLine,
  makeHelperText,
  makeErrorMessage,
} from './mixins'

const FieldBefore = styled.div`
  ${props => makeFieldBefore(props)}
`
const FieldAfter = styled.div`
  ${props => makeFieldAfter(props)}
`
const InputText = styled.input`
  ${props => makeInputText(props)}
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

export class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      fieldValue: '',
      typePassword: 'password',
      iconPassword: 'eye-off',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { errors } = this.props

    if (errors !== prevProps.errors) {
      this.updateState(this.props)
    }
  }

  onChange = event => {
    this.setState({
      fieldValue: event.target.value,
    })
  }

  updateState(params) {
    const { errors, name } = params

    this.setState({
      error: errors && errors[name],
      errorMessage: errors && errors[name] ? errors[name].message : '',
    })
  }

  showPassword = () => {
    const typePassword = this.state.typePassword === 'password' ? 'text' : 'password'
    const iconPassword = this.state.iconPassword === 'eye-off' ? 'eye-open' : 'eye-off'

    this.setState({
      typePassword,
      iconPassword,
    })
  }

  render() {
    const { lighten, before, after, disabled, small, type, name, placeholder, helperText, validation } = this.props
    const { error, errorMessage, fieldValue } = this.state
    const withContent = fieldValue ? 'with-content' : 'without-content'
    const withError = error ? `with-error ${name}-with-error` : `without-error ${name}-without-error`

    return (
      <FieldContainer>
        <Field small={small} className={`${withError} ${withContent}`}>
          {before && <FieldBefore>{before}</FieldBefore>}

          <InputText
            small={small}
            lighten={lighten}
            disabled={disabled}
            id={`${name}-input`}
            name={name}
            type={type === 'password' ? this.state.typePassword : type}
            autoCorrect="on"
            autoComplete="on"
            spellcheck="false"
            placeholder={placeholder}
            ref={validation}
            onChange={this.onChange}
            withBeforeElement={before}
          />

          {after ||
            (type === 'password' && (
              <FieldAfter>
                {type === 'password' ? (
                  <Icon
                    size={small ? '18' : '22'}
                    color={disabled ? 'rgba(0, 0, 24, 0.16)' : '#231F20'}
                    onClick={!disabled && this.showPassword}
                    name={`icon-light-${this.state.iconPassword}`}
                  />
                ) : (
                  { after }
                )}
              </FieldAfter>
            ))}
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
}

Input.propTypes = {
  lighten: PropTypes.bool,
  before: PropTypes.string,
  after: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  validation: PropTypes.func,
  errors: PropTypes.func,
}

Input.defaultProps = {
  lighten: false,
  before: '',
  after: '',
  small: false,
  disabled: false,
  type: 'text',
  helperText: '',
  validation: null,
  errors: null,
}
