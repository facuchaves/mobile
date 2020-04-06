import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Content, CardItem, Text, Body } from 'native-base'
import HTML from 'react-native-render-html'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { NormalizarDescription } from '../../../shared/utils/avisoUtils'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerBody: {
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  titulo: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#666',
    fontSize: 14,
  },
  titleH3: { fontSize: 14, fontWeight: 'bold' },
  valueH3: {
    fontSize: 14,
    fontWeight: 'normal',
    justifyContent: 'flex-start',
  },
  itemBordered: {
    borderBottomColor: DefaultTheme.colors.border,
    borderBottomWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
})
class BodyFichaAviso extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { aviso } = this.props
    return (
      <Content>
        <CardItem style={styles.container}>
          <Body style={styles.containerBody}>
            <Content style={styles.text}>
              <HTML
                html={NormalizarDescription(aviso.descripcion)}
                imagesMaxWidth={Dimensions.get('window').width}
                tagsStyles={{
                  rawtext: styles.contentParagraph,
                }}
              />
            </Content>

            <View style={styles.itemBordered}>
              <Text style={styles.titleH3}>{i18n.t('ficha_aviso:areas')}</Text>
              <Text
                style={[
                  styles.valueH3,
                  {
                    width: width * 0.7,
                  },
                ]}
              >
                {aviso.area.nombre}
              </Text>
            </View>
            <View style={[styles.itemBordered, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={styles.titleH3}>{i18n.t('ficha_aviso:tipo_de_puesto')}</Text>
              <Text
                style={[
                  styles.valueH3,
                  {
                    width: width * 0.6,
                  },
                ]}
              >
                {aviso.tipoTrabajo.nombre}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Content>
    )
  }
}

export default BodyFichaAviso
