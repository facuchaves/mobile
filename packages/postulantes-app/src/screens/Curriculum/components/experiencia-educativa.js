/* eslint-disable no-console */
/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import { orderBy } from 'lodash'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
// SERVICES
import { showModal } from '../../../navigation/helpers'
import StaticEntitiesStore from '../../../storages/staticEntities.store'
// THEME
import { Icon, ButtonUi } from '../../../shared/ui-kit'
import DefaultTheme from '../../../themes/DefaultTheme'
import { vw } from '../../../style/helpers'

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
  header_titulo: {
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 18,
  },
  titulo: {
    width: vw(290),
    color: DefaultTheme.colors.primary,
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  institucion: {
    color: DefaultTheme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  estado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 16,
  },
  item: {
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
    marginBottom: 5,
  },
  date: {
    color: '#8c8c8c',
    fontWeight: 'normal',
    fontSize: 13,
    paddingTop: 5,
  },
  detalle: {
    color: DefaultTheme.colors.labelText,
    fontWeight: 'normal',
    fontSize: 14,
    paddingTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
  },
  buttonText: {
    color: DefaultTheme.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14,
    paddingVertical: 5,
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
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

const ExperienciaEducativa = props => {
  // eslint-disable-next-line react/prop-types
  const { data, updateCv } = props

  const itemEducativa = () => {
    const orderData = orderBy(data, 'fechaInicio', 'desc')
    if (data) {
      return orderData.map(item => {
        return (
          <CardItem key={item.id} style={styles.item}>
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
                // eslint-disable-next-line no-console
                showModal('EDIT_EXPERIENCIA_EDUCATIVA', {
                  updateCv,
                  paises: await StaticEntitiesStore.getState().paises,
                  areas: await StaticEntitiesStore.getState().areas,
                  tiposEstudio: await StaticEntitiesStore.getState().tiposEstudio,
                  estadosEstudio: await StaticEntitiesStore.getState().estadosEstudio,
                  institucionesEducativas: await StaticEntitiesStore.getState().institucionesEducativas,
                  data: item,
                })
              }}
            />
            <Body>
              <Text style={styles.titulo} adjustsFontSizeToFit>
                {item.titulo}
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.institucion}>{item.institucionEducativa.nombre} </Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.estado}>{`${item.tipoEstudio.nombre} . ${item.estadoEstudio.nombre}`}</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.date}>
                  {moment(item.fechaInicio, 'DD-MM-YYYY').format('MMM YYYY')} -{' '}
                  {item.fechaFin ? moment(item.fechaFin, 'DD-MM-YYYY').format('MMM YYYY') : 'Al presente'},{' '}
                  {item.pais.nombre}
                </Text>
              </View>
            </Body>
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
            <Text style={styles.header_titulo}>{i18n.t('curriculum:estudios:title')}</Text>
          </Body>
        </CardItem>
        {itemEducativa()}
        <ThrottledTouchableOpacity
          onPress={async () => {
            showModal('EDIT_EXPERIENCIA_EDUCATIVA', {
              updateCv,
              paises: await StaticEntitiesStore.getState().paises,
              areas: await StaticEntitiesStore.getState().areas,
              tiposEstudio: await StaticEntitiesStore.getState().tiposEstudio,
              estadosEstudio: await StaticEntitiesStore.getState().estadosEstudio,
              institucionesEducativas: await StaticEntitiesStore.getState().institucionesEducativas,
              data: {
                institucionEducativa: '',
                titulo: '',
                areaEstudio: '',
                tipoEstudio: '',
                estadoEstudio: '',
                pais: '',
                id: '',
              },
            })
          }}
        >
          <CardItem footer style={styles.cardFooter}>
            <Icon name="Add-circle" size={25} color="#51cf66" style={styles.iconAdd} />
            <Text style={styles.buttonText}>{i18n.t('curriculum:estudios:button_create')}</Text>
          </CardItem>
        </ThrottledTouchableOpacity>
      </Card>
    </Content>
  )
}

export default ExperienciaEducativa
