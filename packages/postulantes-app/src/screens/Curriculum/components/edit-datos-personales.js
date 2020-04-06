/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// IMPORTS
import React, { Component } from 'react'
import { Container, Content, Form, Item, Label, DatePicker, Picker } from 'native-base'
import { StyleSheet, Dimensions, Text, View, Alert } from 'react-native'
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import { isEmpty, find } from 'lodash'
import * as yup from 'yup'
import { Formik } from 'formik'
import { dismissModal } from '../../../navigation/helpers'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
// SERVICES
import StaticEntitiesStore from '../../../storages/staticEntities.store'
import EditorImage from '../../../api/upload-image-editor'
import i18n from '../../../i18n'
// UI-KIT
import { Icon, InputUi, ButtonUi } from '../../../shared/ui-kit'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'

// THEME
import { vw } from '../../../style/helpers'
import DefaultTheme from '../../../themes/DefaultTheme'
import CurriculumService from '../../../api/curriculum-services'
import Avatar from '../../../components/commons/avatar'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
  },
  bloq1: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    margin: 10,
    height: 'auto',
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  bloq2: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  form: {
    height: 'auto',
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: 0,
  },
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
  },
  item: {
    borderBottomWidth: 0,
    marginHorizontal: 16,
    paddingLeft: 0,
  },

  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: -16,
  },
  /**
   * INPUTS
   */
  inputs: {
    minWidth: vw(332),
    color: DefaultTheme.colors.primaryText,
    paddingLeft: 10,
    marginLeft: -2,
    elevation: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  /**
   * DATE PICKER
   */

  containerPickerDate: {
    backgroundColor: DefaultTheme.colors.background,
    height: 48,
    width: vw(330),
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemDatePicker: {
    textAlign: 'left',
    height: 48,
    marginTop: 0,
    marginLeft: 0,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    padding: 0,
    marginVertical: 16,
  },
  DatePickerText: {
    width,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    marginTop: 14,
    paddingLeft: 3,
    marginLeft: 10,
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
    marginLeft: 0,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
  },
  /**
   * DOCUMENTO
   */

  inputsSmall: {
    width: vw(165),
    color: DefaultTheme.colors.primaryText,
    elevation: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  inputPickerSmall: {
    width: vw(140),
    marginTop: 0,
    marginLeft: 0,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 30,
    padding: 0,
  },
  picker: {
    color: '#666',
    fontSize: 11,
    textAlign: 'left',
  },
  checkboxContainer: {
    marginLeft: 5,
    marginTop: 0,
    height: 'auto',
    borderBottomWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
    paddingLeft: 8,
    color: DefaultTheme.colors.primaryText,
  },
  errorMessage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 5,
    marginLeft: 0,
    paddingLeft: 0,
  },
})

class EditDatosPersonales extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paises: StaticEntitiesStore.getState().paises,
      tiposDocumento: StaticEntitiesStore.getState().tiposDocumento,
      newFotoURL: null,
    }
  }

  dismissModal = () => {
    const { componentId } = this.props
    dismissModal(componentId)
  }

  setUploadImage = image => {
    if (image) {
      this.setState({ newFotoURL: image })
    }
  }

  saveImage = async () => {
    const { newFotoURL } = this.state
    if (newFotoURL) {
      await CurriculumService.uploadFoto(newFotoURL)
      await EditorImage.cleanupImages()
    }
  }

  saveDatosPersonales = async values => {
    const { componentId, updateCv } = this.props
    const body = values
    body.fechaNacimiento = moment(values.fechaNacimiento).format('DD-MM-YYYY')

    // eslint-disable-next-line no-undef
    body.discapacidadDetalle = values.discapacidad ? ' ' : null
    delete body.discapacidad
    const hasError = await updateCv(CurriculumService.guardarDatosPersonales(body))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 1000)
    }
  }

  isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  componentDidMount = () => {
    const { newFotoURL } = this.props
    this.setState({ newFotoURL })
  }

  render() {
    const { data } = this.props
    const { newFotoURL } = this.state
    const {
      fotoURL,
      nombre,
      apellido,
      paisNacimiento,
      fechaNacimiento,
      genero,
      tipoDocumento,
      numeroDocumento,
      discapacidad,
      estadoCivil,
      tieneMovilidadPropia,
      tieneLicenciaConducir,
    } = data

    const { paises, tiposDocumento } = this.state

    const initialValuesForm = {
      nombre,
      apellido,
      paisNacimientoId: paisNacimiento ? paisNacimiento.id : null,
      fechaNacimiento: fechaNacimiento ? new Date(moment(fechaNacimiento, 'DD-MM-YYYY').toDate()) : null,
      genero,
      tipoDocumentoId: tipoDocumento ? tipoDocumento.id : null,
      documento: numeroDocumento,
      discapacidad: discapacidad || false, // Trae string
      estadoCivilId: estadoCivil ? estadoCivil.id : null,
      tieneMovilidadPropia: tieneMovilidadPropia || false,
      tieneLicenciaConducir: tieneLicenciaConducir || false,
    }
    const validationSchema = yup.object().shape({
      nombre: yup.string().required(i18n.t('validation:error_nombre')),
      apellido: yup.string().required(i18n.t('validation:error_apellido')),
      paisNacimientoId: yup
        .number()
        .required(i18n.t('validation:error_nacionalidad'))
        .nullable(i18n.t('validation:error_nacionalidad')),
      fechaNacimiento: yup
        .date()
        .required(i18n.t('validation:error_fecha_nacimiento'))
        .nullable(i18n.t('validation:error_fecha_nacimiento')),
      genero: yup
        .string()
        .required(i18n.t('validation:error_genero'))
        .nullable(i18n.t('validation:error_genero')),
      tipoDocumentoId: yup
        .number()
        .required(i18n.t('validation:error_tipo_documento'))
        .nullable(i18n.t('validation:error_tipo_documento')),
      estadoCivilId: yup
        .number()
        .required(i18n.t('validation:error_civil'))
        .nullable(i18n.t('validation:error_civil')),
      documento: yup
        .number()
        .required(i18n.t('validation:error_documento'))
        .nullable(i18n.t('validation:error_documento')),
    })

    const paisesOptions = paises.map(area => {
      return <Picker.Item label={area.nombre} value={area.id} key={area.id} />
    })

    const tipoDocumentoOptions = tiposDocumento.map(area => {
      return <Picker.Item label={area.nombre} value={area.id} key={area.id} />
    })

    return (
      <Container style={styles.container}>
        <HeaderBackScreen title={i18n.t('curriculum:edit_datos_personales:header_title')} action={this.dismissModal} />
        <Text style={styles.camposObligatorios}>
          <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
        </Text>
        <Content>
          <Formik
            initialValues={initialValuesForm}
            // eslint-disable-next-line consistent-return
            onSubmit={async values => {
              try {
                // SAVE IMAGES
                await this.saveImage()
              } catch (error) {
                Alert(error)
                return false
              }
              // GUARDAMOS RESTO DEL FORM
              this.saveDatosPersonales(values)
            }}
            validationSchema={validationSchema}
            isInitialValid={this.isInitialValid(validationSchema, initialValuesForm)}
          >
            {({ values, errors, setFieldTouched, setFieldValue, handleSubmit }) => (
              <Form style={styles.form}>
                {/* FOTO */}
                <View style={styles.bloq1}>
                  <Item style={styles.avatar}>
                    {/*
                     * Duplique la seccion clickeable por que me genera un error de estilos,revisarlo
                     */}
                    <ThrottledTouchableOpacity
                      onPress={() => {
                        EditorImage.openCamera(false, this.setUploadImage)
                      }}
                    >
                      <Avatar
                        src={(newFotoURL ? `data:${newFotoURL.mime};base64,${newFotoURL.data}` : false) || fotoURL}
                        styles={{ width: 120, height: 120, borderRadius: 75 }}
                      />
                    </ThrottledTouchableOpacity>
                    <ThrottledTouchableOpacity
                      onPress={() => {
                        EditorImage.openCamera(false, this.setUploadImage)
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: DefaultTheme.colors.primary,
                          borderRadius: 20,
                          padding: 5,
                          position: 'relative',
                          left: -40,
                          bottom: -40,
                        }}
                      >
                        <Icon name="Edit-1" color="#fff" size={25} />
                      </View>
                    </ThrottledTouchableOpacity>
                  </Item>
                  {/* NOMBRE */}
                  <InputUi
                    label={i18n.t('curriculum:edit_datos_personales:nombre')}
                    required
                    error={!!errors.nombre}
                    value={values.nombre}
                    setFieldValue={itemValue => {
                      setFieldValue('nombre', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('nombre')}
                    autoCompleteType="name"
                    keyboardType="default"
                    styles={{ item: { marginLeft: 0 }, inputs: styles.inputs }}
                  />
                  {/* ERROR MESSAGE */}
                  {errors.nombre && <Text style={styles.errorMessage}>{errors.nombre}</Text>}
                  {/* APELLIDO */}
                  <InputUi
                    label={i18n.t('curriculum:edit_datos_personales:apellido')}
                    required
                    error={!!errors.apellido}
                    value={values.apellido}
                    setFieldValue={itemValue => {
                      setFieldValue('apellido', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('apellido')}
                    autoCompleteType="off"
                    keyboardType="default"
                    styles={{ item: { marginLeft: 0 }, inputs: styles.inputs }}
                  />
                  {/* ERROR MESSAGE */}
                  {errors.apellido && <Text style={styles.errorMessage}>{errors.apellido}</Text>}
                  {/* FECHA NACIMIENTOS */}
                  <Item stackedLabel style={styles.itemDatePicker}>
                    <Label style={[styles.label, { marginLeft: 0 }]}>
                      {i18n.t('curriculum:edit_datos_personales:fecha_nacimiento')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[
                        styles.containerPickerDate,
                        !!errors.fechaNacimiento && { borderWidth: 1, borderColor: 'red' },
                      ]}
                    >
                      <DatePicker
                        formatChosenDate={date => {
                          return moment(date).format('DD-MM-YYYY')
                        }}
                        maximumDate={new Date(2001, 12, 31)}
                        locale="es"
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType="fade"
                        androidMode="default"
                        defaultDate={values.fechaNacimiento}
                        placeHolderText={
                          !values.fechaNacimiento &&
                          i18n.t('curriculum:edit_datos_personales:fecha_nacimiento_placeholder')
                        }
                        textStyle={
                          !values.alPresente
                            ? styles.DatePickerText
                            : [
                                styles.DatePickerText,
                                {
                                  color: DefaultTheme.colors.tertiaryText,
                                },
                              ]
                        }
                        disabled={false}
                        onDateChange={async itemValue => {
                          setFieldValue('fechaNacimiento', new Date(moment(itemValue, 'DD-MM-YYYY').toDate()))
                          // setFieldTouched('fechaNacimiento')
                        }}
                      />
                    </View>
                    {/* <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text> */}
                  </Item>
                  {/* ERROR MESSAGE */}
                  {errors.fechaNacimiento && <Text style={styles.errorMessage}>{errors.fechaNacimiento}</Text>}
                  {/* NACIONALIDAD */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:edit_datos_personales:nacionalidad')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[
                        styles.containerPicker,
                        !!errors.paisNacimientoId && { borderWidth: 1, borderColor: 'red' },
                      ]}
                    >
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholder="Nacionalidad"
                        placeholderStyle={styles.DatePickerTextPlaceholder}
                        placeholderIconColor="#007aff"
                        selectedValue={values.paisNacimientoId}
                        onValueChange={async itemValue => {
                          setFieldValue('paisNacimientoId', itemValue)
                          setFieldTouched('paisNacimientoId')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:edit_datos_personales:select_option')} value={null} />
                        {paisesOptions}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MESSAGE */}
                  {errors.paisNacimientoId && <Text style={styles.errorMessage}>{errors.paisNacimientoId}</Text>}
                  {/* GENERO */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:edit_datos_personales:genero')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View style={[styles.containerPicker, !!errors.genero && { borderWidth: 1, borderColor: 'red' }]}>
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholder="Genero"
                        placeholderStyle={styles.DatePickerTextPlaceholder}
                        placeholderIconColor="#007aff"
                        selectedValue={values.genero}
                        onValueChange={async itemValue => {
                          setFieldValue('genero', itemValue)
                          setFieldTouched('genero')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:edit_datos_personales:select_option')} value={null} />
                        <Picker.Item label="Femenino" value="femenino" />
                        <Picker.Item label="Masculino" value="masculino" />
                        <Picker.Item label="Otros" value="otro" />
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MESSAGE */}
                  {errors.genero && <Text style={styles.errorMessage}>{errors.genero}</Text>}
                  {/* ESTADO CIVIL */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:edit_datos_personales:civil')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[styles.containerPicker, !!errors.estadoCivilId && { borderWidth: 1, borderColor: 'red' }]}
                    >
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholder="Estado Civil"
                        placeholderStyle={styles.DatePickerTextPlaceholder}
                        placeholderIconColor="#007aff"
                        selectedValue={values.estadoCivilId}
                        onValueChange={async itemValue => {
                          setFieldValue('estadoCivilId', itemValue)
                          setFieldTouched('estadoCivilId')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:edit_datos_personales:select_option')} value={null} />
                        <Picker.Item label="Soltero/a" value={1} />
                        <Picker.Item label="Casado/a" value={2} />
                        <Picker.Item label="Unión Libre" value={290} />
                        <Picker.Item label="Divorciado/a" value={3} />
                        <Picker.Item label="Pareja de Hecho" value={4} />
                        <Picker.Item label="Viudo/a" value={5} />
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MESSAGE */}
                  {errors.estadoCivilId && <Text style={styles.errorMessage}>{errors.estadoCivilId}</Text>}

                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* DOCUMENTO */}
                    <Item stackedLabel style={{ marginLeft: 16, borderBottomWidth: 0 }}>
                      <Label style={[styles.label, { marginLeft: -16 }]}>
                        {i18n.t('curriculum:edit_datos_personales:documento')} <Text style={styles.asterisco}> *</Text>
                      </Label>
                      <View
                        style={[
                          styles.containerPicker,
                          !!errors.tipoDocumentoId && { borderWidth: 1, borderColor: 'red' },
                          { marginHorizontal: 0, marginLeft: -16 },
                        ]}
                      >
                        <Picker
                          mode="dialog"
                          iosIcon={<Icon name="arrow-down" />}
                          style={styles.inputPickerSmall}
                          placeholder="Tipo Documento"
                          placeholderStyle={styles.DatePickerTextPlaceholder}
                          placeholderIconColor="#007aff"
                          selectedValue={values.tipoDocumentoId}
                          onValueChange={async itemValue => {
                            setFieldValue('tipoDocumentoId', itemValue)
                            setFieldTouched('tipoDocumentoId')
                          }}
                        >
                          <Picker.Item label={i18n.t('curriculum:edit_datos_personales:select_option')} value={null} />
                          {tipoDocumentoOptions}
                        </Picker>
                      </View>
                    </Item>

                    <View>
                      <InputUi
                        label="Numero"
                        required
                        error={!!errors.documento}
                        value={values.documento}
                        setFieldValue={itemValue => {
                          setFieldValue('documento', itemValue)
                        }}
                        setFieldTouched={() => setFieldTouched('documento')}
                        autoCompleteType="cc-number"
                        keyboardType="numeric"
                        styles={{
                          inputs: styles.inputsSmall,
                        }}
                      />
                    </View>
                  </View>
                  {/* ERROR MESSAGE */}
                  {errors.documento && <Text style={styles.errorMessage}>{errors.documento}</Text>}
                  {/* ERROR MESSAGE */}
                  {errors.tipoDocumentoId && <Text style={styles.errorMessage}>{errors.tipoDocumentoId}</Text>}
                </View>
                <View style={styles.bloq2}>
                  <CheckBoxItem
                    style={{ borderBottomWidth: 0, marginLeft: -5, marginBottom: 10, textAlign: 'left' }}
                    text={i18n.t('curriculum:edit_datos_personales:licencia_conducir')}
                    value={null}
                    handleChange={() => setFieldValue('tieneLicenciaConducir', !values.tieneLicenciaConducir)}
                    checked={values.tieneLicenciaConducir}
                  />

                  <CheckBoxItem
                    style={{ borderBottomWidth: 0, marginLeft: -5, textAlign: 'left' }}
                    text={i18n.t('curriculum:edit_datos_personales:movilidad_propia')}
                    value={null}
                    handleChange={() => setFieldValue('tieneMovilidadPropia', !values.tieneMovilidadPropia)}
                    checked={values.tieneMovilidadPropia}
                  />
                </View>

                <ButtonUi
                  text={i18n.t('curriculum:edit_datos_personales:button_submit')}
                  disabled={!isEmpty(errors)}
                  onPress={handleSubmit}
                  styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
                />
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    )
  }
}

export default EditDatosPersonales
