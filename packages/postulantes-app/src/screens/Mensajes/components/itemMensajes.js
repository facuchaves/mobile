/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React from 'react'
import { ListItem, Body, Left, Thumbnail, Text, View } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import ScreenIds from '../../../constants/ScreenIds'
import { showModal } from '../../../navigation/helpers'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { Icon } from '../../../shared/ui-kit'

const { width } = Dimensions.get('window')
const stylesMensajeRecomendados = StyleSheet.create({
  itemContainer: {
    width: width - 20,
    alignSelf: 'center',
    margin: 0,
    marginBottom: 3,
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: DefaultTheme.colors.white,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  itemBody: {
    borderWidth: 0,
    borderBottomColor: 'transparent',
  },
  logo: {
    backgroundColor: DefaultTheme.colors.white,
    margin: 0,
    width: 92,
    height: 60,
    marginLeft: 10,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 13,
    color: '#329af0',
  },
  nombreEmpresa: {
    fontSize: 16,
    color: DefaultTheme.colors.primary,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  mensajeType: {
    fontSize: 14,
    color: DefaultTheme.colors.primaryText,
    width: width / 2,
  },
  fecha: {
    fontSize: 14,
    color: DefaultTheme.colors.tertiaryText,
    marginTop: 10,
    textAlign: 'right',
  },
  fechaContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    marginVertical: 1,
    marginHorizontal: 5,
    fontSize: 14,
  },
})

const ItemMensajes = props => {
  // eslint-disable-next-line react/prop-types
  const { mensaje, updateMensajes } = props
  const urlLogo = mensaje.logoEmpresaURL ? { uri: mensaje.logoEmpresaURL } : require('../../../images/logo-empty.png')
  return (
    <ListItem
      avatar
      style={stylesMensajeRecomendados.itemContainer}
      backgroundColor={mensaje.leido ? '#F5F5F5' : DefaultTheme.colors.white}
      key={mensaje.id}
    >
      <Left>
        <Thumbnail source={urlLogo} style={stylesMensajeRecomendados.logo} />
      </Left>
      <Body style={stylesMensajeRecomendados.itemBody}>
        <ThrottledTouchableOpacity
          onPress={async () => {
            showModal(ScreenIds.CHAT, {
              idChat: mensaje.postulacionId ? mensaje.postulacionId : mensaje.id,
              idMarcaLeido: mensaje.id,
              nombreEmpresa: mensaje.nombreEmpresa,
              updateMensajes,
              type: mensaje.tipo,
            })
          }}
        >
          <Text style={stylesMensajeRecomendados.nombreEmpresa} adjustsFontSizeToFit numberOfLines={1}>
            {mensaje.nombreEmpresa || mensaje.titulo}
          </Text>
          <Text
            style={stylesMensajeRecomendados.mensajeType}
            adjustsFontSizeToFit
            numberOfLines={2}
            type={mensaje.tipo}
          >
            {mensaje.tipo === 'postulacion' ? mensaje.titulo : mensaje.nombreEmpresa}
          </Text>
          <View style={stylesMensajeRecomendados.fechaContainer}>
            <Text note style={stylesMensajeRecomendados.fecha}>
              {mensaje.fechaModificacion ? i18n.t('mensajes:fecha')(mensaje.fechaModificacion) : null}
            </Text>
            <Icon name="Arrow-right" color="#888" style={stylesMensajeRecomendados.icon} />
          </View>
        </ThrottledTouchableOpacity>
      </Body>
    </ListItem>
  )
}

export default ItemMensajes
