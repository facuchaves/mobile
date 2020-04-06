/* eslint-disable react/prop-types */
// IMPORTS
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Header, Text, Body, Right } from 'native-base'
import ThrottledTouchableOpacity from '../../components/commons/ThrottledTouchableOpacity'
import { Icon } from '.'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'

const styles = StyleSheet.create({
  title: {
    position: 'relative',
    color: '#fff',
    fontSize: 18,
    margin: 0,
    // marginLeft: 10,
    alignSelf: 'center',
  },
})
export default class HeaderBasic extends Component {
  elementRightRender = (iconRightText, iconRightAction) => {
    if (iconRightText) {
      return (
        <Right>
          <ThrottledTouchableOpacity onPress={() => iconRightAction()}>
            <Icon name={iconRightText} color="#fff" size={24} />
          </ThrottledTouchableOpacity>
        </Right>
      )
    }
    return null
  }

  render() {
    const { title, iconRightText, iconRightAction } = this.props

    return (
      <Header hasText Left style={{ backgroundColor: DefaultTheme.colors.primary }}>
        <Body>
          <Text style={styles.title}>{title}</Text>
        </Body>
        {this.elementRightRender(iconRightText, iconRightAction)}
      </Header>
    )
  }
}
