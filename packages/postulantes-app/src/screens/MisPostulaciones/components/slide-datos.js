/* eslint-disable global-require */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { Icon } from '../../../shared/ui-kit'

const styles = StyleSheet.create({
  wrapper: { height: 40 },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    fontSize: 40,
    color: DefaultTheme.colors.tertiaryText,
    fontWeight: '300',
    lineHeight: 40,
    marginRight: 10,
  },
  count: {
    color: '#000',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  text: {
    color: '#000',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
  },
})

const SlideDatos = props => {
  // eslint-disable-next-line react/prop-types
  const { data } = props
  return (
    <Swiper style={styles.wrapper} showsButtons={false} autoplay showsPagination={false} autoplayTimeout={3.5}>
      <View style={styles.slide}>
        <Icon name="Layers" style={styles.icon} />
        <Text style={styles.count}>{data ? data[0].quantity : 0} </Text>
        <Text style={styles.text}>{i18n.t('mis_postulaciones:slider:no_leido')}</Text>
      </View>
      <View style={styles.slide}>
        <Icon name="Inbox" style={styles.icon} />
        <Text style={styles.count}>{data ? data[1].quantity : 0} </Text>
        <Text style={styles.text}>{i18n.t('mis_postulaciones:slider:leido')}</Text>
      </View>
      <View style={styles.slide}>
        <Icon name="Edit-2" style={styles.icon} />
        <Text style={styles.count}>{data ? data[2].quantity : 0} </Text>
        <Text style={styles.text}>{i18n.t('mis_postulaciones:slider:incompletas')}</Text>
      </View>
    </Swiper>
  )
}

export default SlideDatos
