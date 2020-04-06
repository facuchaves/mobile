/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Left, Button, Header, Body, Title } from 'native-base'
import { Icon } from '../../../shared/ui-kit'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = StyleSheet.create({
  titulo: { marginLeft: -60, color: DefaultTheme.colors.white },
  footer: {
    backgroundColor: '#FFF',
  },
})

export default class HeaderChat extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { titulo, closeModal } = this.props
    return (
      <Header style={{ backgroundColor: DefaultTheme.colors.primary }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              closeModal()
            }}
          >
            <Icon name="Close" color="white" size={28} />
          </Button>
        </Left>
        <Body style={styles.tituloContainer}>
          <Title style={styles.titulo}>{titulo || ''}</Title>
        </Body>
      </Header>
    )
  }
}
