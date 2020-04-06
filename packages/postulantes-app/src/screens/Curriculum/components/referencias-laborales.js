// IMPORTS
import React from 'react'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { filter } from 'lodash'
import i18n from '../../../i18n'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import { showModal } from '../../../navigation/helpers'

// SERVICES
import CurriculumService from '../../../api/curriculum-services'
// THEME
import { Icon, ButtonUi } from '../../../shared/ui-kit'
import DefaultTheme from '../../../themes/DefaultTheme'

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
  datoDefault: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    paddingBottom: 0,
    fontWeight: 'normal',
  },
  name: {
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
    color: DefaultTheme.colors.primary,
  },
  datoEmail: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  referenciaText: {
    color: DefaultTheme.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14,
    paddingVertical: 5,
  },
  confirmacionText: {
    color: DefaultTheme.colors.fourthText,
    fontSize: 16,
    lineHeight: 16,
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
})

const ReferenciasLaborales = props => {
  // eslint-disable-next-line react/prop-types
  const { data, habilitar, updateCv } = props
  // eslint-disable-next-line react/prop-types
  const estadosReferencia = estado => {
    switch (estado) {
      case 'confirmada':
        return (
          <Text style={[styles.confirmacionText, { color: DefaultTheme.colors.primary }]}>
            {i18n.t('curriculum:referencia_laboral:estado:aprobada')}
          </Text>
        )
      case 'rechazada':
        return (
          <Text style={[styles.confirmacionText, { color: DefaultTheme.colors.error }]}>
            {i18n.t('curriculum:referencia_laboral:estado:rechazada')}
          </Text>
        )
      default:
        return (
          <Text style={styles.confirmacionText}>{i18n.t('curriculum:referencia_laboral:estado:sin_confirmar')}</Text>
        )
    }
  }
  const refencias = filter(data, { tipo: 'laboral' })

  const itemRefenciaLaboral = () => {
    return refencias.map(item => {
      return (
        <CardItem key={item.id} style={styles.item}>
          <Body>
            <Text style={styles.name}>
              {item.nombre} {item.apellido}
            </Text>
            <View>
              <Text style={styles.label}>{i18n.t('curriculum:referencia_laboral:relacion')}</Text>
              <Text style={styles.datoDefault}>{item.relacion}</Text>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('curriculum:referencia_laboral:experiencia_relacion')}</Text>
              <Text style={styles.datoDefault}>{item.detalle}</Text>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('curriculum:referencia_laboral:puesto')}</Text>
              <Text style={styles.datoDefault}>{item.puesto}</Text>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('curriculum:referencia_laboral:email')}</Text>
              <Text style={styles.datoEmail} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>{i18n.t('curriculum:referencia_laboral:telefono')}</Text>
              <Text style={styles.datoDefault}>
                {item.telefono.prefijo} {item.telefono.numero}
              </Text>
            </View>
            <View>{estadosReferencia(item.estado)}</View>
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
              showModal('EDIT_REFERENCIA_LABORAL', {
                i18n,
                experiencias: await CurriculumService.getReleacionLaboral(),
                data: item,
                updateCv,
              })
            }}
          />
        </CardItem>
      )
    })
  }

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:referencia_laboral:title')}</Text>
          </Body>
        </CardItem>
        {itemRefenciaLaboral()}

        {habilitar ? (
          <ThrottledTouchableOpacity
            onPress={async () => {
              // eslint-disable-next-line no-console

              showModal('EDIT_REFERENCIA_LABORAL', {
                i18n,
                experiencias: await CurriculumService.getReleacionLaboral(),
                updateCv,
                data: {
                  relacion: '',
                  detalle: '',
                  puesto: '',
                  email: '',
                  telefono: '',
                  estado: '',
                  experiencia: '',
                  nombre: '',
                  apellido: '',
                  id: '',
                },
              })
            }}
          >
            <CardItem footer style={styles.cardFooter}>
              <Icon name="Add-circle" style={styles.iconAdd} />
              <Text style={styles.referenciaText}>{i18n.t('curriculum:referencia_laboral:button_create')}</Text>
            </CardItem>
          </ThrottledTouchableOpacity>
        ) : (
          <CardItem footer style={styles.cardFooter}>
            <Text>{i18n.t('curriculum:referencia_laboral:button_requered_laboral')}</Text>
          </CardItem>
        )}
      </Card>
    </Content>
  )
}

export default ReferenciasLaborales
