/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import i18n from '../../../i18n'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'normal',
    padding: 20,
    textAlign: 'center',
  },
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
export default class EmptyListing extends React.Component {
  static options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      bottomTabs: {
        visible: true,
        drawBehind: true,
        animate: false,
      },
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image width="250" height="150" source={require('../../../images/empty-avisos.png')} style={styles.image} />
        <Text style={styles.title}>{i18n.t('listado_avisos:empty_list:title')}</Text>
        <Text style={styles.detalle}>{i18n.t('listado_avisos:empty_list:subtitle')}</Text>
      </View>
    )
  }
}
