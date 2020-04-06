/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import { StyleSheet, View } from 'react-native'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { showModal } from '../../../navigation/helpers'

import StaticEntitiesStore from '../../../storages/staticEntities.store'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'

// UI-KIT
import { Icon, ButtonUi } from '../../../shared/ui-kit'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerTitulo: {
    backgroundColor: DefaultTheme.colors.white,
    borderBottomWidth: 0,
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
  item: {
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
    marginBottom: 5,
  },
  idiomaName: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: 18,
    marginTop: -10,
  },
  text: {
    color: '#666',
    fontSize: 14,
    paddingBottom: 5,
  },

  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
  },
  iconAdd: {
    marginLeft: -7,
    fontSize: 25,
    color: DefaultTheme.colors.secondary,
  },
  iconEdit: {
    minWidth: 10,
    height: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
    zIndex: 1,
  },
  referenciaText: {
    color: DefaultTheme.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14,
    paddingVertical: 5,
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

const Idiomas = props => {
  // eslint-disable-next-line react/prop-types
  const { idiomas, keysIdiomas, updateCv } = props

  const itemConocimiento = () => {
    if (idiomas) {
      return Object.values(idiomas).map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <CardItem key={index} style={styles.item}>
            <Body>
              <View style={styles.flexRow}>
                <Text style={styles.datoDefidiomaNameault}>{item.Escrito.tipo.nombre}</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  {item.Escrito.calificador.nombre} - {item.Escrito.nivel.nombre}
                </Text>
                <Text style={styles.text}>
                  {item.Oral.calificador.nombre} - {item.Oral.nivel.nombre}
                </Text>
              </View>
            </Body>
            <ButtonUi
              transparent
              text={null}
              iconRight="Edit-1"
              styles={{
                button: styles.iconEdit,
                icon: {
                  fontSize: 24,
                  color: DefaultTheme.colors.primary,
                },
              }}
              onPress={async () => {
                showModal('EDIT_IDIOMAS', {
                  i18n,
                  item,
                  idiomasData: await StaticEntitiesStore.getState().idiomas,
                  updateCv,
                  keysIdiomas,
                })
              }}
            />
          </CardItem>
        )
      })
    }
    return null
  }

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:idiomas:title')}</Text>
          </Body>
        </CardItem>
        {itemConocimiento()}
        <ThrottledTouchableOpacity
          onPress={async () => {
            showModal('EDIT_IDIOMAS', {
              updateCv,
              idiomasData: await StaticEntitiesStore.getState().idiomas,
              item: null,
              keysIdiomas,
            })
          }}
        >
          <CardItem footer style={styles.cardFooter}>
            <Icon name="Add-circle" style={styles.iconAdd} />
            <Text style={styles.referenciaText}>{i18n.t('curriculum:idiomas:button_create')}</Text>
          </CardItem>
        </ThrottledTouchableOpacity>
      </Card>
    </Content>
  )
}

export default Idiomas
