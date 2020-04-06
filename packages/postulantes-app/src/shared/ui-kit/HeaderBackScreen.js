/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, Text, Body, Left } from 'native-base'
import DefaultTheme from '../../themes/DefaultTheme'
import { Icon } from '.'

import ThrottledTouchableOpacity from '../../components/commons/ThrottledTouchableOpacity'

const stylesDefault = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: DefaultTheme.colors.primary,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  icon: {
    color: DefaultTheme.colors.white,
    fontSize: 26,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  iconTransparent: {
    color: DefaultTheme.colors.primary,
  },
  buttonBack: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 18,
  },
})

const HeaderBackScreen = ({ title, action, styles, trasnparent }) => {
  return (
    <Header noShadow style={[stylesDefault.header, styles && styles.header, trasnparent && stylesDefault.transparent]}>
      <Left style={stylesDefault.buttonBack}>
        <ThrottledTouchableOpacity
          onPress={() => {
            action()
          }}
        >
          <Icon
            name="Arrow-left"
            style={[stylesDefault.icon, styles && styles.icon, trasnparent && stylesDefault.iconTransparent]}
          />
        </ThrottledTouchableOpacity>
      </Left>
      {title ? (
        <Body style={stylesDefault.title}>
          <Text style={stylesDefault.textTitle}>{title}</Text>
        </Body>
      ) : null}
    </Header>
  )
}

export default HeaderBackScreen
