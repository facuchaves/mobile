/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { CheckBox } from 'react-native'
import { Item, Text, Body } from 'native-base'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'

export default class CheckBoxItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      value: null,
    }
  }

  hableButton = (value, handleChange) => {
    this.setState({ checked: !this.state.checked, value }, () => {
      handleChange(value)
    })
  }

  render() {
    const {
      text,
      value,
      checked,
      handleChange,
      color = DefaultTheme.colors.primary,
      style = { borderBottomWidth: 0, height: 40 },
      disabled = false,
    } = this.props
    return (
      <Item style={style}>
        <CheckBox
          value={checked}
          onValueChange={() => this.hableButton(value, handleChange)}
          color={color}
          disabled={disabled}
        />
        <Body>
          <Text
            style={{ fontSize: 14, color: DefaultTheme.colors.primaryText, textAlign: 'left', alignSelf: 'flex-start' }}
          >
            {text}
          </Text>
        </Body>
      </Item>
    )
  }
}
