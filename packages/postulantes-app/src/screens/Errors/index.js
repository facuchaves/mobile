/* eslint-disable no-console */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import RNRestart from 'react-native-restart'
import NetInfo from '@react-native-community/netinfo'
import { View, Text, StyleSheet, Image } from 'react-native'
import { dismissModal } from '../../navigation/helpers'
import i18n from '../../i18n'

import { ButtonUi } from '../../shared/ui-kit'
import DefaultTheme from '../../themes/DefaultTheme'
/*
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.background,
  },
  title: {
    fontSize: 32,
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    marginTop: 20,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: DefaultTheme.colors.secondaryText,
    fontWeight: 'normal',
    padding: 0,
    marginVertical: 16,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  image: { alignSelf: 'center', width: 200 },
  button: {
    alignSelf: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
})

/*
 * La pantalla de error
 * autodectecta la conexion internet y deberia la pantalla a error connection o error
 * los interceptor esta en las capas de servicios de request
 * y en navigation/helpers method showModal el mismo valida la conexion y bloquea la apartura de modal * y muestra el error
 */

const BootError = props => {
  const { componentId, restart } = props
  // maneja el estado de la conexion .flag para definir type  'connection / error'
  const [internetAccess, setInternetAccess] = useState(true)

  const handleDismissOverlay = () => {
    dismissModal(componentId)
    // eslint-disable-next-line no-unused-expressions
    if (restart) {
      RNRestart.Restart()
    }
  }
  const CheckConnectivity = async () => {
    const connection = await NetInfo.fetch()
    setInternetAccess(!connection.isInternetReachable)
  }

  useEffect(() => {
    CheckConnectivity()
  }, [internetAccess])

  const urlImage = internetAccess
    ? require('../../images/error_connection.png')
    : require('../../images/bad_request.png')
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={urlImage} style={styles.image} />

      <Text style={styles.title}>
        {internetAccess ? i18n.t('error_pages:title_conexion') : i18n.t('error_pages:title_req')}
      </Text>
      <Text style={styles.subtitle}>
        {internetAccess ? i18n.t('error_pages:subtitle_conexion') : i18n.t('error_pages:subtitle_req')}
      </Text>
      <ButtonUi text="Reintentar" onPress={() => handleDismissOverlay()} />
      {/* <Button onPress={handleDismissOverlay} text={i18n.t('buttons:retry')} /> */}
    </View>
  )
}

/*
 * PropTypes
 */

BootError.propTypes = {
  componentId: PropTypes.string.isRequired,
  restart: PropTypes.bool,
}

BootError.defaultProps = {
  restart: false,
}

/*
 * Exports
 */

export default BootError
