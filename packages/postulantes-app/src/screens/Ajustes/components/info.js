/* eslint-disable no-console */
import React from 'react'
import { Text, StyleSheet, Linking, View } from 'react-native'
import Config from 'react-native-config'
import VersionNumber from 'react-native-version-number'
import { Container } from 'native-base'
import i18n from '../../../i18n'
import { dismissModal } from '../../../navigation/helpers'

import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// UI
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  containerItem: {
    margin: 20,
    marginLeft: 24,
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  h1: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    color: DefaultTheme.colors.secondary,
    marginTop: 20,
  },
  copyRight: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: DefaultTheme.colors.primaryText,
    marginTop: 20,
  },
})

const AcercaDe = props => {
  const codeVersion = VersionNumber.appVersion
  // eslint-disable-next-line react/prop-types
  const { componentId } = props
  const { PORTAL } = Config
  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <HeaderBackScreen
        title={i18n.t('curriculum:ajustes:info:title')(PORTAL)}
        action={() => {
          dismissModal(componentId)
        }}
      />
      <View style={styles.containerItem}>
        <Text style={styles.h1}>{i18n.t('curriculum:ajustes:info:version')(codeVersion)}</Text>
        <Text style={styles.copyRight}>{i18n.t('curriculum:ajustes:info:copyrigt')}</Text>
        <ThrottledTouchableOpacity
          onPress={() => Linking.openURL(`${Config.PORTAL_PATH}publico/politica_de_privacidad`)}
        >
          <Text style={styles.h1}>{i18n.t('curriculum:ajustes:info:politicas')}</Text>
        </ThrottledTouchableOpacity>
        <ThrottledTouchableOpacity
          onPress={() => Linking.openURL(`${Config.PORTAL_PATH}publico/terminos_y_condiciones`)}
        >
          <Text style={styles.h1}>{i18n.t('curriculum:ajustes:info:terminos')}</Text>
        </ThrottledTouchableOpacity>
        <ThrottledTouchableOpacity
          onPress={() => Linking.openURL(`${Config.PORTAL_PATH}publico/politica_gestion_calidad`)}
        >
          <Text style={styles.h1}>{i18n.t('curriculum:ajustes:info:gestion')}</Text>
        </ThrottledTouchableOpacity>
      </View>
    </Container>
  )
}

export default AcercaDe
