/* eslint-disable global-require */
import React from 'react'
import { ListItem, Body, Right, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import ScreenIds from '../../constants/ScreenIds'
import ThrottledTouchableOpacity from '../../components/commons/ThrottledTouchableOpacity'
import { CalcularTiempoInicioPublicacion } from '../utils/avisoUtils'
// import i18n from '../../i18n'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
import Logo from '../../components/commons/logo-empresa'

const stylesAvisoRecomendados = StyleSheet.create({
  itemContainer: {
    backgroundColor: DefaultTheme.colors.surface,
    alignSelf: 'center',
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0,
    borderRadius: 8,
    elevation: 1,
  },
  itemBody: {
    borderWidth: 0,
    borderBottomColor: 'transparent',
  },
  logo: {
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.surface,
    margin: 0,
    width: 71,
    height: 45,
  },
  titulo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: DefaultTheme.colors.primary,
  },
  nombreEmpresa: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    color: DefaultTheme.colors.primaryText,
  }, // cambiar por color primary
  localidad: {
    fontSize: 12,
    color: DefaultTheme.colors.tertiaryText,
    fontWeight: 'normal',
    lineHeight: 16,
  },
  fecha: {
    fontSize: 12,
    color: DefaultTheme.colors.tertiaryText,
    marginTop: 15,
    fontWeight: 'normal',
    lineHeight: 16,
  },
})

const ItemCardAviso = props => {
  // eslint-disable-next-line react/prop-types
  const { aviso, showModal } = props

  const GetEmpresaName = (confidencial, nameEmpresa) => {
    if (!confidencial) {
      return (
        <Text style={stylesAvisoRecomendados.nombreEmpresa} adjustsFontSizeToFit numberOfLines={1}>
          {nameEmpresa}
        </Text>
      )
    }

    return null
  }

  return (
    <ListItem avatar style={stylesAvisoRecomendados.itemContainer} key={aviso.id}>
      <Body style={stylesAvisoRecomendados.itemBody}>
        <ThrottledTouchableOpacity
          onPress={() => showModal(ScreenIds.FICHA_AVISO, { idAviso: aviso.id, areasId: aviso.idArea })}
        >
          <Text style={stylesAvisoRecomendados.titulo} adjustsFontSizeToFit numberOfLines={2}>
            {aviso.titulo}
          </Text>

          {GetEmpresaName(aviso.confidencial, aviso.empresa)}

          <Text style={stylesAvisoRecomendados.localidad} adjustsFontSizeToFit numberOfLines={1}>
            {aviso.localizacion}
          </Text>
        </ThrottledTouchableOpacity>
      </Body>
      <Right>
        <Logo LogoUrl={aviso.logoURL} styles={stylesAvisoRecomendados.logo} />
        <Text note style={stylesAvisoRecomendados.fecha}>
          {/*  {i18n.t('listado_avisos:card_aviso:fecha')(aviso.fechaPublicacion)} */}
          {CalcularTiempoInicioPublicacion(aviso.fechaPublicacion)}
        </Text>
      </Right>
    </ListItem>
  )
}

export default ItemCardAviso
