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
import { showModal } from '../../../navigation/helpers'
import { Icon, ButtonUi } from '../../../shared/ui-kit'
// THEME
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
  titulo: {
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 18,
  },
  puesto: {
    width: vw(290),
    color: DefaultTheme.colors.primary,
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  empresa: {
    color: DefaultTheme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  item: {
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
    marginBottom: 5,
  },
  date: {
    color: DefaultTheme.colors.labelText,
    fontWeight: 'normal',
    fontSize: 14,
    paddingTop: 5,
  },
  detalle: {
    paddingTop: 5,
    color: DefaultTheme.colors.primaryText,
    fontWeight: 'normal',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopColor: DefaultTheme.colors.border,
    borderTopWidth: 1,
  },
  referenciaText: {
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
})

const ExperienciaLaborales = props => {
  // eslint-disable-next-line react/prop-types
  const { data, updateCv } = props

  const itemRefenciaLaboral = () => {
    const orderData = orderBy(data, 'fechaInicio', 'desc')
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
            onPress={() => {
              showModal('EDIT_EXPERIENCIA_LABORAL', {
                updateCv,
                data: item,
              })
            }}
          />
          <Body>
            <Text style={styles.puesto} adjustsFontSizeToFit>
              {item.puesto}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.empresa}>{item.empresa} </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.date}>
                {moment(item.fechaInicio, 'DD-MM-YYYY').format('MMM YYYY')} -{' '}
                {item.fechaFin ? moment(item.fechaFin, 'DD-MM-YYYY').format('MMM YYYY') : 'Al presente'},{' '}
                {item.pais.nombre}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={styles.detalle}>{item.detalle}</Text>
            </View>
          </Body>
        </CardItem>
      )
    })
  }

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:experiencia:title')}</Text>
          </Body>
        </CardItem>
        {itemRefenciaLaboral()}
        <ThrottledTouchableOpacity
          onPress={() => {
            showModal('EDIT_EXPERIENCIA_LABORAL', {
              updateCv,
              data: {
                empresa: '',
                puesto: '',
                fechaInicio: '',
                fechaFin: '',
                areaId: '',
                detalle: '',
                manejaPresupuesto: false,
                cantidadPersonasACargo: '',
                area: '',
                subArea: '',
                industria: '',
                nivelPuesto: '',
                pais: '',
                id: '',
              },
            })
          }}
        >
          <CardItem footer style={styles.cardFooter}>
            <Icon name="Add-circle" style={styles.iconAdd} />
            <Text style={styles.referenciaText}>{i18n.t('curriculum:experiencia:button_create')}</Text>
          </CardItem>
        </ThrottledTouchableOpacity>
      </Card>
    </Content>
  )
}

export default ExperienciaLaborales
