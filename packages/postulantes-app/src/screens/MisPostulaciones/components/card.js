/* eslint-disable global-require */
import React, { useState } from 'react'
import { ListItem, Body, Left, Thumbnail, Text, Row, Grid, Accordion, View } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'

import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { Icon } from '../../../shared/ui-kit'

import EstadosComponent from './avisos-estados'
import DefaultTheme from '../../../themes/DefaultTheme'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFF',
    width: width - 20,
    alignSelf: 'center',
    margin: 0,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderRadius: 8,
    borderBottomWidth: 1,
  },
  itemRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemBody: {
    borderWidth: 0,
    borderBottomColor: 'transparent',
    flexDirection: 'column',
    flex: 1,
  },
  logo: {
    borderRadius: 0,
    backgroundColor: '#fff',
    margin: 0,
    width: 90,
    height: 57,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  titulo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: DefaultTheme.colors.primary,
  },
  nombreEmpresa: {
    fontSize: 14,
    color: '#4a4a4a',
    lineHeight: 20,
    fontWeight: 'normal',
    marginTop: 8,
  },
  revisoCv: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 25,
  },
  revisoCvBold: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  revisoDays: {
    color: '#7c7c7c',
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconChat: {
    position: 'absolute',
    bottom: 0,
    right: -3,
  },
  avisoFinalizado: {
    backgroundColor: '#eaeaea',
    borderRadius: 20,
    color: '#9f9f9f',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    paddingTop: 2,
  },
  cardFooter: {
    backgroundColor: '#f00',
    padding: 0,
    margin: 0,
  },
  boxCartaButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: DefaultTheme.colors.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    bottom: -22,
  },
  cartaButton: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 12,
  },
  cartaIconButton: {},
  cartaText: {
    flex: 1,
    backgroundColor: 'transparent',
    color: DefaultTheme.colors.primaryText,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})

const Card = props => {
  // eslint-disable-next-line react/prop-types
  const { aviso, showModal } = props

  const [cartaVisibility, setCartaVisibility] = useState(false)

  /*   const seRevisoCV = () => {
    // eslint-disable-next-line radix
    const dias = parseInt(CalcularTiempoDias(aviso.fechaPostulacion))
    if (aviso.estado.toLowerCase() !== 'espera' && dias !== null && dias !== 0) {
      let textDias = ''
      if (dias === 0) {
        textDias = <Translate message="mis-postulaciones-publicado-reviso-hoy" />
      } else if (dias === 1) {
        textDias = <Translate message="mis-postulaciones-publicado-reviso-dia" params={{ count: dias }} />
      } else {
        textDias = <Translate message="mis-postulaciones-publicado-reviso-dias" params={{ count: dias }} />
      }
      return (
        <Text style={styles.revisoCvBold}>
          <Translate message="mis-postulaciones-publicado-reviso" />
          <Text style={styles.revisoDays}>{textDias}</Text>
        </Text>
      )
    }
    return <Text />
  } */

  const renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderWidth: 0,
          borderBottomWidth: 0,
          flexDirection: 'row',
          padding: 10,
        }}
      >
        {expanded ? (
          <Icon
            style={{ fontSize: 18, marginRight: 15 }}
            color={DefaultTheme.colors.labelText}
            name="Arrow-triangle-down"
          />
        ) : (
          <Icon style={{ fontSize: 18, marginRight: 15 }} name="Arrow-triangle-up" />
        )}
        <Text>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.title[0]} </Text>
          <Text style={{ fontWeight: 'normal', fontSize: 12 }}>{item.title[1]}</Text>
        </Text>
      </View>
    )
  }

  const renderContent = item => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          fontSize: 12,
          width: width / 1.1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: 25,
        }}
      >
        <Text style={{ borderTopWidth: 1, borderTopColor: DefaultTheme.colors.border, width, padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.content[0][0]} </Text>
          <Text style={{ fontWeight: 'normal', fontSize: 12 }}>{item.content[0][1]}</Text>
        </Text>
        <Text style={{ borderTopWidth: 1, borderTopColor: DefaultTheme.colors.border, width, padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.content[1][0]} </Text>
          <Text style={{ fontWeight: 'normal', fontSize: 12 }}>{item.content[1][1]}</Text>
        </Text>
      </View>
    )
  }
  const urlLogo = aviso.logoURL ? { uri: aviso.logoURL } : require('../../../images/logo-empty.png')
  return (
    <ListItem
      avatar
      style={styles.itemContainer}
      key={aviso.key}
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line react/destructuring-assignment
      // eslint-disable-next-line react/prop-types
    >
      <Grid>
        <Row style={{ borderBottomWidth: 1, borderBottomColor: DefaultTheme.colors.border }}>
          <Left style={styles.itemRight}>
            <Thumbnail source={urlLogo} style={styles.logo} />
            <EstadosComponent estado={aviso.estado} />
          </Left>
          <Body style={styles.itemBody}>
            <ThrottledTouchableOpacity onPress={() => showModal('FICHA_AVISO', { idAviso: aviso.avisoId })}>
              <Text style={styles.titulo} adjustsFontSizeToFit numberOfLines={1}>
                {aviso.titulo}
              </Text>
            </ThrottledTouchableOpacity>
            <Text style={styles.nombreEmpresa} adjustsFontSizeToFit numberOfLines={1}>
              {aviso.empresa}
            </Text>
            {/* seRevisoCV(aviso) */}
            {aviso.cartaDePresentacion ? (
              <ThrottledTouchableOpacity
                onPress={() => setCartaVisibility(!cartaVisibility)}
                style={styles.boxCartaButton}
              >
                <Text style={styles.cartaButton}>{i18n.t('mis_postulaciones:filtros:carta')}</Text>
                <Icon
                  size={16}
                  name={cartaVisibility ? 'Arrow-triangle-down' : 'Arrow-triangle-up'}
                  color="#666"
                  style={styles.cartaIconButton}
                />
              </ThrottledTouchableOpacity>
            ) : null}
          </Body>
          {/* <Right style={{ borderBottomWidth: 0 }}>
            <ThrottledTouchableOpacity
              onPress={() => {
                console.log('VER MENSAJES')
              }}
            >
              <Icon size={25} name="Message-square" style={styles.iconChat} />
            </ThrottledTouchableOpacity>
          </Right> */}
        </Row>
        {aviso.cartaDePresentacion && cartaVisibility ? (
          <Row>
            <Text style={styles.cartaText}>{aviso.cartaDePresentacion}</Text>
          </Row>
        ) : null}

        <Row>
          <Accordion
            dataArray={[
              {
                title: [
                  i18n.t('mis_postulaciones:salario'),
                  aviso.preferenciaSalarial || i18n.t('mis_postulaciones:salario_empty'),
                ],
                content: [
                  [i18n.t('mis_postulaciones:filtros:fecha_publicacion'), aviso.fechaPublicacionAviso],
                  [i18n.t('mis_postulaciones:filtros:fecha_postulacion'), aviso.fechaPostulacion],
                ],
              },
            ]}
            style={{ borderWidth: 0, fontSize: 12 }}
            renderHeader={renderHeader}
            renderContent={renderContent}
          />
        </Row>
      </Grid>
    </ListItem>
  )
}

export default Card
