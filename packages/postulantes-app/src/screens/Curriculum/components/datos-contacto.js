/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { Content, Card, CardItem, Text, Body, Right } from 'native-base'
import { StyleSheet } from 'react-native'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
import { showModal } from '../../../navigation/helpers'
import { Icon } from '../../../shared/ui-kit'

// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import StaticEntitiesStore from '../../../storages/staticEntities.store'
import StaticEntities from '../../../api/static-entities-services'

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
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 5,
    marginTop: 8, // ver con kevin
  },
  datoDefault: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    paddingBottom: 5,
  },
  datoEmail: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    paddingBottom: 5,
  },
})

const DatosContacto = props => {
  // eslint-disable-next-line react/prop-types
  const { data, updateCv } = props

  const initialStaticEntitiesFormEdit = async () => {
    const initLocation = {
      paises: StaticEntitiesStore.getState().paises,
      provincias: data.domicilio.pais ? await StaticEntities.getProvincias(data.domicilio.pais.id) : [],
      localidades: data.domicilio.provincia ? await StaticEntities.getLocalidades(data.domicilio.provincia.id) : [],
    }
    return initLocation
  }

  return (
    <Content padder style={styles.container}>
      <Card style={styles.box}>
        <CardItem header style={styles.containerTitulo}>
          <Body>
            <Text style={styles.titulo}>{i18n.t('curriculum:datos_contacto:title')}</Text>
          </Body>
          <Right>
            <ThrottledTouchableOpacity
              onPress={async () => {
                showModal('EDIT_DATOS_CONTACTO', {
                  data,
                  i18n,
                  staticEntitiesInit: await initialStaticEntitiesFormEdit(),
                  updateCv,
                })
              }}
            >
              <Icon name="Edit-1" color={DefaultTheme.colors.primary} size={25} />
            </ThrottledTouchableOpacity>
          </Right>
        </CardItem>
        <CardItem style={styles.box}>
          <Body>
            <Text style={styles.label}>{i18n.t('curriculum:datos_contacto:telefono')}</Text>
            <Text style={styles.datoDefault}>
              {data.telefonoFijo.numero
                ? `${data.telefonoFijo.prefijo} ${data.telefonoFijo.numero}`
                : i18n.t('curriculum:datos_contacto:telefono_empty')}
            </Text>
            {/* <Text style={styles.label}>{i18n.t('curriculum:datos_contacto:telefono_alternativo')}</Text>
            <Text style={styles.datoDefault}>
              {data.telefonoCelular.numero
                ? `${data.telefonoCelular.prefijo} ${data.telefonoCelular.numero}`
                : i18n.t('curriculum:datos_contacto:telefono_empty')}
            </Text> */}
            <Text style={styles.label}>{i18n.t('curriculum:datos_contacto:email')}</Text>
            <Text style={styles.datoEmail} numberOfLines={1}>
              {data.email}
            </Text>
            <Text style={styles.label}>{i18n.t('curriculum:datos_contacto:direccion')}</Text>
            <Text style={styles.datoDefault} numberOfLines={1}>
              {data.direccion ? `${data.direccion}` : i18n.t('curriculum:datos_contacto:direccion_empty')}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  )
}

export default DatosContacto
