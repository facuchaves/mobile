/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { showModal } from '../../navigation/helpers'
import DefaultTheme from '../../themes/DefaultTheme'
import i18n from '../../i18n'
// UI
import { ButtonUi } from '../../shared/ui-kit'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 40,
    color: '#000',
  },
  button: {
    margin: 10,
    marginTop: 16,
    borderRadius: 5,
    flex: 1,
  },
  buttonTextLogin: {
    color: '#fff',
  },
  buttonTextRegistro: {
    color: DefaultTheme.colors.secondary,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 35,
  },
})

const PreLoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require('../../images/image-pre-registro.png')} style={styles.image} />
      <Text style={styles.subtitle}>
        <Text style={{ fontWeight: 'bold' }}>{i18n.t('pre_login:title')}</Text>
        {i18n.t('pre_login:subtitle')}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <ButtonUi
          transparent
          bordered
          styles={{ button: styles.button }}
          text={i18n.t('pre_login:button_create')}
          onPress={() => {
            showModal('REGISTRO', {})
          }}
        />
        <ButtonUi
          success
          styles={{ text: styles.buttonTextLogin, button: styles.button }}
          text={i18n.t('button:button_enterokay')}
          onPress={() => {
            showModal('LOGIN', {})
          }}
        />
      </View>
    </View>
  )
}

export default PreLoginScreen
