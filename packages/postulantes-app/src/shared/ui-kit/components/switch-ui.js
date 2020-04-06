import React from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import PropTypes from 'prop-types'
import DefaultTheme from '../../../themes/DefaultTheme'

export const SwitchUi = ({ onValueChange, value, textlabel, onColor, offColor, stylesLabel, buttonSize, disabled }) => (
  <ToggleSwitch
    isOn={value}
    onColor={onColor}
    offColor={offColor}
    label={textlabel}
    labelStyle={stylesLabel}
    size={buttonSize} // 'large', 'medium', 'small'
    onToggle={onValueChange}
    disabled={disabled}
  />
)

SwitchUi.propTypes = {
  value: PropTypes.bool.isRequired,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  textlabel: PropTypes.string,
  stylesLabel: PropTypes.oneOfType([PropTypes.object]),
  buttonSize: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

SwitchUi.defaultProps = {
  onColor: DefaultTheme.colors.secondary,
  offColor: '#ccc',
  textlabel: null,
  stylesLabel: { color: '#ccc' },
  buttonSize: 'medium',
  disabled: false,
}
