import React from 'react'
import { Text, StyleSheet, Linking } from 'react-native'
import { Content, Card, CardItem, Body } from 'native-base'
import Config from 'react-native-config'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerTitulo: {
    backgroundColor: DefaultTheme.colors.white,
    borderBottomColor: DefaultTheme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
    borderRadius: 8,
  },
  box: {
    borderRadius: 8,
  },
  titulo: {
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    margin: 3,
    lineHeight: 20,
    marginLeft: 0,
    marginTop: 1,
    color: '#666',
  },
})

const VideoCvRedirect = () => {
  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:video:header_title')}</Text>
          </Body>
        </CardItem>
        <CardItem style={styles.box}>
          <Text style={styles.text}>{i18n.t('curriculum:video:title_part1')}</Text>
          <ThrottledTouchableOpacity onPress={() => Linking.openURL(`${Config.PORTAL_PATH}candidatos/curriculum`)}>
            <Text style={[styles.text, { fontWeight: 'bold', color: DefaultTheme.colors.primary }]}>
              {i18n.t('curriculum:video:title_part2')}
            </Text>
          </ThrottledTouchableOpacity>
        </CardItem>
      </Card>
    </Content>
  )
}

export default VideoCvRedirect
