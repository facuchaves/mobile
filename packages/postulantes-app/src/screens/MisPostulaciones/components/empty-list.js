/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: DefaultTheme.colors.background,
  },
  detalle: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  image: { alignSelf: 'center' },
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
const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require('../../../images/empty-postulation.png')} style={styles.image} />
      <Text style={styles.detalle}>{i18n.t('mis_postulaciones:empty_list')}</Text>
    </View>
  )
}

export default EmptyList
