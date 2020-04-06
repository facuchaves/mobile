import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MakeToggleContainer, MakeToggleSlider, MakeToggleInput } from './mixins'

const ToggleContainer = styled.div`
  ${props => MakeToggleContainer(props)}
`

const ToggleSlider = styled.span`
  ${props => MakeToggleSlider(props)}
`

const ToggleInput = styled.input`
  ${props => MakeToggleInput(props, ToggleSlider)}
`

export const Toggle = props => {
  const { disabled, small } = props
  const [isChecked, toggleCheked] = useState(0)

  return (
    <ToggleContainer onClick={() => !disabled && toggleCheked(!isChecked)} small={small}>
      <ToggleInput {...props} type="checkbox" checked={isChecked} />
      <ToggleSlider {...props} checked={isChecked} />
    </ToggleContainer>
  )
}

Toggle.propTypes = {
  disabled: PropTypes.bool,
  small: PropTypes.bool,
}

Toggle.defaultProps = {
  disabled: false,
  small: false,
}
