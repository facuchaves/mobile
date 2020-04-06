/* eslint-disable react/prop-types */
// IMPORTS
import React, { useState } from 'react'
import { Content, Form, Item, Label, Picker } from 'native-base'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { isEmpty, find } from 'lodash'
import * as yup from 'yup'
import { Formik } from 'formik'
import i18n from '../../../i18n'
import { dismissModal } from '../../../navigation/helpers'
// SERVICES
import apiGoogleMaps from '../../../hooks/api/api-google-maps'
import StaticEntities from '../../../api/static-entities-services'
import CurriculumService from '../../../api/curriculum-services'

// UI-KIT
import { Icon, InputUi, ButtonUi } from '../../../shared/ui-kit'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'
// THEME
import { vw } from '../../../style/helpers'
import DefaultTheme from '../../../themes/DefaultTheme'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  formularioContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    margin: 10,
    height: 'auto',
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  item: {
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: 10,
  },
  itemEmail: {
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: 0,
  },

  label: {
    color: '#bdbdbd',
    fontSize: 14,
    paddingBottom: 5,
  },
  inputs: {
    width: vw(330),
    backgroundColor: DefaultTheme.colors.background,
    elevation: 1,
  },
  /**
   *  TELEFONO
   */
  containerTelefono: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputPrefijo: {
    width: vw(100),
    marginVertical: 0,
    marginBottom: 0,
    maxHeight: 48,
    marginTop: 0,
    color: DefaultTheme.colors.primaryText,
    paddingLeft: 10,
    elevation: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  inputTelefono: {
    width: vw(213),
    marginVertical: 0,
    marginBottom: 0,
    maxHeight: 48,
    marginLeft: 16,
    marginTop: 0,
    color: DefaultTheme.colors.primaryText,
    paddingLeft: 10,
    elevation: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  heightPicker: { flex: 1 },
  PickerTextPlaceholder: {
    width,
    color: '#757575',
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    marginTop: 5,
    marginLeft: 40,
  },
  /**
   *  PICKER STANDAR
   */
  containerPicker: {
    backgroundColor: DefaultTheme.colors.background,
    height: 50,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  inputPicker: {
    width: vw(330),
    marginTop: 0,
    marginLeft: 2,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
  },
  picker: {
    width,
    color: '#666',
    fontSize: 11,
    textAlign: 'left',
  },
  asterisco: {
    color: '#f00',
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
  },
  errorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 5,
    marginLeft: 0,
    paddingLeft: 0,
  },
})

const EditDatosContacto = props => {
  const { data, componentId, staticEntitiesInit, updateCv } = props

  const [staticEntities, setStaticEntities] = useState({
    paises: staticEntitiesInit.paises,
    provincias: staticEntitiesInit.provincias.provincias,
    localidades: staticEntitiesInit.localidades.localidades,
    isLoading: false,
  })

  const getOptionPicker = options => {
    if (options) {
      return options.map(item => {
        return <Picker.Item label={item.nombre} value={item.id} key={item.id} />
      })
    }
    return null
  }

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  const saveDatos = async values => {
    const body = values

    if (values.geolocationChange) {
      body.geolocation = await apiGoogleMaps.searchGoogleMaps(
        values.paisNacimientoId ? find(staticEntities.paises, { id: values.paisNacimientoId }).nombre : null,
        values.provincia ? find(staticEntities.provincias, { id: values.provincia }).nombre : null,
        values.localidad ? find(staticEntities.localidades, { id: values.localidad }).nombre : null,
        values.direccion
      )
    } else {
      delete body.geolocation
    }
    delete body.geolocationChange

    const hasError = await updateCv(CurriculumService.guardarDatosPersonales(body))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 1000)
    }
  }

  const { domicilio, telefonoFijo, telefonoCelular, email } = data
  const initialValuesForm = {
    telefonoFijoPrefijo: telefonoFijo ? telefonoFijo.prefijo : null,
    telefonoFijoNumero: telefonoFijo ? telefonoFijo.numero : null,
    celularPrefijo: telefonoCelular ? telefonoCelular.prefijo : null,
    celularNumero: telefonoCelular ? telefonoCelular.numero : null,
    email,
    paisNacimientoId: domicilio.pais ? domicilio.pais.id : null,
    provincia: domicilio.provincia ? domicilio.provincia.id : null,
    localidad: domicilio.localidad ? domicilio.localidad.id : null,
    direccion: domicilio.direccion,
    geolocation: [],
    geolocationChange: false, // FLAG para detectar si se modificaron los datos de geolocation
  }
  const validationSchema = yup.object().shape({
    telefonoFijoPrefijo: yup.number(i18n.t('validation:error_telefono')).required(i18n.t('validation:error_telefono')),
    telefonoFijoNumero: yup.number(i18n.t('validation:error_telefono')).required(i18n.t('validation:error_telefono')),
    email: yup
      .string()
      .email(i18n.t('validation:error_email'))
      .required(i18n.t('validation:error_email')),
    paisNacimientoId: yup
      .number()
      .required(i18n.t('validation:error_pais_residencia'))
      .nullable(i18n.t('validation:error_pais_residencia')),
    provincia: yup
      .number()
      .required(i18n.t('validation:error_provincia'))
      .nullable(i18n.t('validation:error_provincia')),
    localidad: yup
      .number()
      .required(i18n.t('validation:error_localidad'))
      .nullable(i18n.t('validation:error_localidad')),
    direccion: yup
      .string()
      .required(i18n.t('validation:error_direccion'))
      .nullable(i18n.t('validation:error_direccion')),
  })

  /*  if (staticEntities.isLoading) {
    return <Text />
  } */

  return (
    <Content style={styles.container}>
      <HeaderBackScreen
        title={i18n.t('curriculum:edit_datos_contacto:header_title')}
        action={() => {
          dismissModal(componentId)
        }}
      />
      <Text style={styles.camposObligatorios}>
        <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
      </Text>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={async values => {
          saveDatos(values)
        }}
        validationSchema={validationSchema}
        isInitialValid={isInitialValid(validationSchema, initialValuesForm)}
      >
        {({ values, errors, setFieldTouched, setFieldValue, handleSubmit }) => (
          <Form>
            <Content style={styles.formularioContent}>
              {/* TELEFONO */}
              <Text style={styles.label}>
                {i18n.t('curriculum:edit_datos_contacto:telefono_contacto')}
                <Text style={styles.asterisco}> *</Text>
              </Text>
              <View style={styles.containerTelefono}>
                <InputUi
                  label={null}
                  required
                  error={!!errors.telefonoFijoPrefijo}
                  value={values.telefonoFijoPrefijo}
                  setFieldValue={itemValue => {
                    setFieldValue('telefonoFijoPrefijo', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('telefonoFijoPrefijo')}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  styles={{ inputs: styles.inputPrefijo, label: styles.label }}
                />

                <InputUi
                  label={null}
                  required
                  error={!!errors.telefonoFijoNumero}
                  value={values.telefonoFijoNumero}
                  setFieldValue={itemValue => {
                    setFieldValue('telefonoFijoNumero', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('telefonoFijoNumero')}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  styles={{
                    item: { marginLeft: 0, marginTop: 0 },
                    inputs: styles.inputTelefono,
                    label: styles.label,
                  }}
                />
              </View>

              {/* ERROR MENSSAGE */}
              {errors.telefonoFijoPrefijo || errors.telefonoFijoNumero ? (
                <Text style={[styles.errorMenssage, { marginTop: -10 }]}>{i18n.t('validation:error_telefono')}</Text>
              ) : null}

              {/* OTRO TELEFONO */}
              <Text style={styles.label}>{i18n.t('curriculum:edit_datos_contacto:otro_telefono')}</Text>
              <View style={styles.containerTelefono}>
                <InputUi
                  label={null}
                  required
                  error={!!errors.celularPrefijo}
                  value={values.celularPrefijo}
                  setFieldValue={itemValue => {
                    setFieldValue('celularPrefijo', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('celularPrefijo')}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  styles={{ inputs: styles.inputPrefijo, label: styles.label }}
                />

                <InputUi
                  label={null}
                  required
                  error={!!errors.celularNumero}
                  value={values.celularNumero}
                  setFieldValue={itemValue => {
                    setFieldValue('celularNumero', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('celularNumero')}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  styles={{
                    item: { marginLeft: 0, marginTop: 0 },
                    inputs: styles.inputTelefono,
                    label: styles.label,
                  }}
                />
              </View>

              {/* Email */}
              <InputUi
                transparent
                label={i18n.t('curriculum:edit_datos_contacto:email')}
                required
                error={!!errors.email}
                value={values.email}
                setFieldValue={itemValue => {
                  setFieldValue('email', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('email')}
                autoCompleteType="email"
                keyboardType="default"
                styles={{ item: styles.itemEmail, inputs: styles.inputs, label: styles.label }}
              />
              {/* ERROR MENSSAGE */}
              {errors.email && <Text style={styles.errorMenssage}>{errors.email}</Text>}
              {/* Pais */}
              <Item stackedLabel style={[styles.item, styles.heightPicker]}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:edit_datos_contacto:pais')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View
                  style={[styles.containerPicker, !!errors.paisNacimientoId && { borderWidth: 1, borderColor: 'red' }]}
                >
                  <Picker
                    mode="dialog"
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:edit_datos_contacto:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.paisNacimientoId}
                    onValueChange={async itemValue => {
                      const reloadData = await StaticEntities.getProvincias(itemValue)
                      setStaticEntities({
                        ...staticEntities,
                        provincias: itemValue ? reloadData.provincias : [],
                        localidades: [],
                      })

                      setFieldValue('paisNacimientoId', itemValue)
                      setFieldValue('geolocationChange', true)
                      setFieldTouched('paisNacimientoId')
                      setFieldValue('provincia', '')
                      setFieldValue('localidad', '')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:edit_datos_contacto:select_option')} value={null} />
                    {getOptionPicker(staticEntities.paises)}
                  </Picker>
                </View>
              </Item>
              {/* ERROR MENSSAGE */}
              {errors.paisNacimientoId && <Text style={styles.errorMenssage}>{errors.paisNacimientoId}</Text>}

              {/* Provincias */}
              <Item stackedLabel style={[styles.item, styles.heightPicker]}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:edit_datos_contacto:provincia')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.provincia && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:edit_datos_contacto:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.provincia}
                    onValueChange={async itemValue => {
                      const reloadData = await StaticEntities.getLocalidades(itemValue)
                      setStaticEntities({
                        ...staticEntities,
                        localidades: itemValue ? reloadData.localidades : [],
                      })

                      setFieldValue('provincia', itemValue)
                      setFieldValue('geolocationChange', true)
                      setFieldTouched('provincia')
                      setFieldValue('localidad', '')
                      setFieldTouched('localidad')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:edit_datos_contacto:select_option')} value={null} />
                    {getOptionPicker(staticEntities.provincias)}
                  </Picker>
                </View>
              </Item>
              {/* ERROR MENSSAGE */}
              {errors.provincia && <Text style={styles.errorMenssage}>{errors.provincia}</Text>}
              {/* Localidad */}
              <Item stackedLabel style={[styles.item, styles.heightPicker]}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:edit_datos_contacto:localidad')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.localidad && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:edit_datos_contacto:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.localidad}
                    onValueChange={itemValue => {
                      setFieldValue('localidad', itemValue)
                      setFieldValue('geolocationChange', true)
                      setFieldTouched('localidad')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:edit_datos_contacto:select_option')} value={null} />
                    {getOptionPicker(staticEntities.localidades)}
                  </Picker>
                </View>
              </Item>
              {/* ERROR MENSSAGE */}
              {errors.localidad && <Text style={styles.errorMenssage}>{errors.localidad}</Text>}
              {/* direccion */}
              <InputUi
                transparent
                label={i18n.t('curriculum:edit_datos_contacto:direccion')}
                required
                error={!!errors.direccion}
                value={values.direccion}
                setFieldValue={itemValue => {
                  setFieldValue('geolocationChange', true)
                  setFieldValue('direccion', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('direccion')}
                autoCompleteType="street-address"
                keyboardType="default"
                styles={{ item: styles.item, inputs: styles.inputs, label: styles.label }}
              />
              {/* ERROR MENSSAGE */}
              {errors.direccion && <Text style={styles.errorMenssage}>{errors.direccion}</Text>}
            </Content>

            <ButtonUi
              success
              text={i18n.t('curriculum:edit_datos_contacto:button_save')}
              disabled={!isEmpty(errors)}
              onPress={handleSubmit}
              styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
            />
          </Form>
        )}
      </Formik>
    </Content>
  )
}

export default EditDatosContacto
