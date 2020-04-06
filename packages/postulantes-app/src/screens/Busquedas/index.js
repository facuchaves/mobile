/* eslint-disable react/prop-types */
// IMPORTS
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { Container, Header, Item, Input, Content, Picker, Form } from 'native-base'
import i18n from '../../i18n'
import { showModal, dismissModal } from '../../navigation/helpers'
import { BusquedasRecientes } from '../../shared/utils/filtrosUtils'
import StaticEntitiesStore from '../../storages/staticEntities.store'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// COMPONENTS
import { ButtonUi, Icon } from '../../shared/ui-kit'

const styles = StyleSheet.create({
  buttonSubmit: {
    marginTop: 20,
  },
  form: {
    marginHorizontal: 10,
  },
})

const FiltrosBusqueda = props => {
  const [staticEntities] = useState({
    areas: StaticEntitiesStore.getState().areas,
    location: StaticEntitiesStore.getState().provincias,
  })

  // eslint-disable-next-line no-unused-vars
  const filtrarAvisos = async filtros => {
    /* GUARDAMOS EN STORAGE */
    await BusquedasRecientes.put(filtros)
    /* REDIRECT A LISTADO CON PROPS FILTROS */
    showModal('LISTADO_AVISOS', {
      filtros,
    })
  }

  const areasOptions = staticEntities.areas
    ? staticEntities.areas.map(area => {
        return <Picker.Item label={area.nombre} value={area.id} key={area.id} />
      })
    : null

  const lugarDeTrabajoOptions = staticEntities.location
    ? staticEntities.location.map(location => {
        return <Picker.Item label={location.nombre} value={location.id} key={location.id} />
      })
    : null

  return (
    <Container>
      {/* HEADER SEARCH BAR */}
      <Formik
        initialValues={{
          query: null,
          diasFechaPublicacion: null,
          provinciasId: null,
          areasId: null,
        }}
        onSubmit={values => filtrarAvisos(values)} // filtrarAvisos(values)
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <Content>
            <Header searchBar rounded style={{ backgroundColor: DefaultTheme.colors.primary }}>
              <Item style={{ paddingHorizontal: 10, borderRadius: 8 }}>
                <Icon
                  name="Arrow-left"
                  color={DefaultTheme.colors.primary}
                  size={20}
                  onPress={() => dismissModal(props.componentId)}
                />
                <Input
                  placeholder={i18n.t('buscador:placeholder')}
                  autoFocus
                  value={values.query}
                  onChangeText={handleChange('query')}
                  style={{ marginLeft: 13 }}
                />
              </Item>
            </Header>
            <Form style={styles.form}>
              {/* COMBO FECHA DE PUBLICACION */}
              <Item picker Icon>
                <Picker
                  iosIcon={<Icon name="arrow-down" />}
                  placeholderStyle={DefaultTheme.colors.secondaryText}
                  placeholderIconColor={DefaultTheme.colors.primary}
                  selectedValue={values.diasFechaPublicacion}
                  onValueChange={itemValue => {
                    setFieldValue('diasFechaPublicacion', itemValue)
                  }}
                >
                  <Picker.Item label={i18n.t('buscador:filtros:label_publicacion')} value={null} />
                  <Picker.Item label={i18n.t('buscador:filtros:options_fechas:hoy')} value={0} />
                  <Picker.Item label={i18n.t('buscador:filtros:options_fechas:ayer')} value={1} />
                  <Picker.Item label={i18n.t('buscador:filtros:options_fechas:semana')} value={7} />
                  <Picker.Item label={i18n.t('buscador:filtros:options_fechas:quincena')} value={15} />
                  <Picker.Item label={i18n.t('buscador:filtros:options_fechas:mes')} value={30} />
                </Picker>
              </Item>
              {/* COMBO LUGAR DE TRABAJO */}
              <Item picker Icon>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder={i18n.t('buscador:filtros:label_lugar_de_trabajo')}
                  selectedValue={values.provinciasId}
                  onValueChange={itemValue => {
                    setFieldValue('provinciasId', itemValue)
                  }}
                >
                  <Picker.Item label={i18n.t('buscador:filtros:label_lugar_de_trabajo')} value={null} />
                  {lugarDeTrabajoOptions}
                </Picker>
              </Item>
              {/* COMBO AREA */}
              <Item picker Icon>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder={i18n.t('buscador:filtros:label_area')}
                  placeholderStyle={DefaultTheme.colors.secondaryText}
                  placeholderIconColor={DefaultTheme.colors.primary}
                  selectedValue={values.areasId}
                  onValueChange={itemValue => {
                    setFieldValue('areasId', itemValue)
                  }}
                >
                  <Picker.Item label={i18n.t('buscador:filtros:label_area')} value={null} />
                  {areasOptions}
                </Picker>
              </Item>

              {/* BUTTON FILTRAR */}
              <ButtonUi
                text={i18n.t('buscador:button_submit')}
                onPress={handleSubmit}
                styles={{ button: styles.buttonSubmit }}
              />
            </Form>
          </Content>
        )}
      </Formik>
    </Container>
  )
}

export default FiltrosBusqueda
