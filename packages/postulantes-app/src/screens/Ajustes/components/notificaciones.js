/* eslint-disable no-console */
import React, { useState } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { filter } from 'lodash'
import { Container, Content, Item, H3 } from 'native-base'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'
// SERVICES
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { dismissModal } from '../../../navigation/helpers'
import CuentaServices from '../../../api/cuenta-service'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// UI
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'
import { Icon, Loading } from '../../../shared/ui-kit'

const { width } = Dimensions.get('screen')

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
  h3: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: DefaultTheme.colors.primary,
    marginTop: 20,
    marginLeft: 15,
  },
  title: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    color: DefaultTheme.colors.primary,
    marginTop: 20,
  },
  texto: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: DefaultTheme.colors.primaryText,
    width: width * 0.8,
  },
  boxAlertas: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  alertItemBox: {
    width: width * 0.8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
    backgroundColor: DefaultTheme.colors.secondary,
  },
  alertasItem: {
    color: DefaultTheme.colors.white,
    fontSize: 12,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
})

const Notificaciones = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId } = props

  const [alertas, setAlertas] = useState([])
  const [suscripcionData, setSuscripcionData] = useState([])
  const [loading, setLoading] = useState(true)

  const getAlerts = async () => {
    const alertasInit = await CuentaServices.getAlertas()
    setAlertas(alertasInit)
  }

  const getSuscripciones = async () => {
    const suscripcionInit = await CuentaServices.getSuscripciones()
    setSuscripcionData(suscripcionInit)
  }

  const changeSuscripcion = async name => {
    const suscripcion = filter(suscripcionData, it => it.nombre === name)
    const suscripcionId = suscripcion[0].id
    if (suscripcion[0].habilitado) {
      await CuentaServices.deleteSuscripciones(suscripcionId)
    } else {
      await CuentaServices.putSuscripciones(suscripcionId)
    }
    getSuscripciones()
  }

  const deleteAlerta = async alertaID => {
    await CuentaServices.deleteAlertas(alertaID)
    getAlerts()
  }

  useNavigationComponentDidAppear(async () => {
    // INIT STATIC ENTITIES
    await getAlerts()
    await getSuscripciones()
    setLoading(false)
  }, componentId)

  const getAlertas = () => {
    if (alertas.length > 0) {
      return alertas.map(data => {
        return (
          <Item key={data.id} style={{ borderBottomWidth: 0 }}>
            <View style={styles.alertItemBox}>
              {data.criterios.map(item => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Text style={styles.alertasItem}>{item}</Text>
                )
              })}
            </View>
            <ThrottledTouchableOpacity onPress={() => deleteAlerta(data.id)}>
              <Icon name="Trash-2" size={26} color="black" style={{ marginLeft: 10 }} />
            </ThrottledTouchableOpacity>
          </Item>
        )
      })
    }

    return (
      <Text style={[styles.texto, { paddingLeft: 5 }]}>
        {i18n.t('curriculum:ajustes:notificaciones:edit:warning_alertas')}
      </Text>
    )
  }

  const itemNotificaicon = (name, title, text) => {
    const estado = filter(suscripcionData, it => it.nombre === name)
    return (
      <Item style={{ paddingBottom: 10, borderBottomWidth: 0 }}>
        <View style={{ marginRight: 10 }}>
          <CheckBoxItem
            style={{ borderBottomWidth: 0, marginLeft: 10, marginTop: -15, textAlign: 'left' }}
            text={null}
            value={name}
            handleChange={item => changeSuscripcion(item)}
            checked={estado[0] ? estado[0].habilitado : false}
          />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.texto}>{text}</Text>
        </View>
      </Item>
    )
  }

  if (loading) {
    return Loading.loader()
  }

  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <HeaderBackScreen
        title="Notificaciones y alertas"
        action={() => {
          dismissModal(componentId)
        }}
      />
      <Content>
        <View>
          <H3 style={styles.h3}> {i18n.t('curriculum:ajustes:notificaciones:edit:title')}</H3>

          {itemNotificaicon(
            'Newsletter',
            i18n.t('curriculum:ajustes:notificaciones:edit:newsletter:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:newsletter:text')
          )}
          {itemNotificaicon(
            'Envios Laborales',
            i18n.t('curriculum:ajustes:notificaciones:edit:envios:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:envios:text')
          )}
          {itemNotificaicon(
            'Envios Comerciales',
            i18n.t('curriculum:ajustes:notificaciones:edit:comercial:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:comercial:text')
          )}
          {itemNotificaicon(
            'Resumen de Actividad',
            i18n.t('curriculum:ajustes:notificaciones:edit:actividad:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:actividad:text')
          )}
          {itemNotificaicon(
            'Avisos especiales',
            i18n.t('curriculum:ajustes:notificaciones:edit:especiales:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:especiales:text')
          )}
          {itemNotificaicon(
            'Notificacion Espontanea',
            i18n.t('curriculum:ajustes:notificaciones:edit:postulaciones:title'),
            i18n.t('curriculum:ajustes:notificaciones:edit:postulaciones:text')
          )}
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: DefaultTheme.colors.border }}>
          <H3 style={styles.h3}>{i18n.t('curriculum:ajustes:notificaciones:edit:title_alertas')}</H3>
          <View style={styles.boxAlertas}>{getAlertas()}</View>
        </View>
      </Content>
    </Container>
  )
}

export default Notificaciones
