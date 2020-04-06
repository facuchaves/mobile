/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React from 'react'
import { Container, Content, Form, Item, Label, DatePicker, Picker, Toast } from 'native-base'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import { find } from 'lodash'
import moment from 'moment'
import * as yup from 'yup'
import { Formik } from 'formik'
import i18n from '../../../i18n'
// SERVICES

import { dismissModal } from '../../../navigation/helpers'
import CurriculumService from '../../../api/curriculum-services'

// UI-KIT
import { Icon, Modal, ButtonUi, AutocompleteUi, InputUi } from '../../../shared/ui-kit'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'
// THEME
import { vw } from '../../../style/helpers'
import DefaultTheme from '../../../themes/DefaultTheme'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
  },
  containerForm: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    margin: 10,
    flex: 1,
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  item: {
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  // INPUT TEXT/NUMBER
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    textAlign: 'left',
    paddingBottom: 15,
  },
  inputs: {
    width: vw(335),
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
  },
  textArea: {
    width: width * 0.9,
    color: DefaultTheme.colors.background,
    fontSize: 16,
    padding: 0,
    paddingTop: 5,
    paddingLeft: 0,
    borderWidth: 0,
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
  PickerText: {
    width,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    marginTop: 5,
    marginLeft: -20,
  },
  inputPicker: {
    width: vw(340),
    marginTop: 0,
    marginLeft: 0,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
  },
  /**
   * DATE PICKER
   */
  containerDate: {
    // contenedor general de los datePicker
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  containerPickerDate: {
    // contenedor individual de los datePicker
    backgroundColor: DefaultTheme.colors.background,
    height: 48,
    width: width * 0.4,
    alignSelf: 'flex-start',
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 5,
    borderRadius: 8,
    borderWidth: 0,
    elevation: 1,
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
    marginBottom: 22,
    borderBottomWidth: 0,
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
  DatePickerTextDisabled: {
    color: DefaultTheme.colors.disabledText,
  },
  checkboxContainer: {
    marginLeft: 0,
    marginTop: 5,
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomColor: 'white',
  },
  errorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 3,
    marginLeft: -3,
    paddingLeft: 5,
  },
})

const EditExperienciaEducativa = props => {
  const { data, componentId, updateCv, paises, areas, tiposEstudio, estadosEstudio, institucionesEducativas } = props

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  const getOptionPicker = dataOptions => {
    if (dataOptions) {
      return dataOptions.map(item => {
        return <Picker.Item label={item.nombre} value={item.id} key={item.id} />
      })
    }
    return null
  }

  /*  const formatDate = date => {
    return new Date(date).toLocaleDateString()
  } */

  const deleteExperienciaEducativa = async id => {
    await updateCv(
      CurriculumService.deleteEstudio(id).then(response => {
        const hasError = response.status === 500
        if (hasError) {
          Toast.show({
            text: i18n.t('validation:error:request'),
            buttonText: 'Okay',
            duration: 10000,
            type: 'danger',
            position: 'bottom',
          })
        }

        if (!hasError) {
          dismissModal(componentId)
        }
      })
    )
  }

  const saveExperienciaEducativa = async (values, id) => {
    const body = values
    body.institucionEducativa = {
      institucionId: values.institucionEducativa,
      nombre: find(institucionesEducativas, { id: values.institucionEducativa }).nombre,
    }
    body.fechaInicio = moment(values.fechaInicio).format('DD-MM-YYYY')
    body.fechaFin = values.fechaFin ? moment(values.fechaFin).format('DD-MM-YYYY') : null

    const hasError = await updateCv(CurriculumService.guardarEstudio(body, id))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 1000)
    }
  }

  const buttonEliminar = id => {
    if (id) {
      return (
        <ButtonUi
          transparent
          text={i18n.t('button:button_delete')}
          styles={{ text: { color: 'red' } }}
          onPress={() => {
            Modal(
              null,
              i18n.t('curriculum:estudios:warning_delete'),
              i18n.t('button:no'),
              null,
              i18n.t('button:si'),
              () => {
                deleteExperienciaEducativa(id)
              }
            )
          }}
        />
      )
    }
    return <Text />
  }

  const {
    institucionEducativa,
    titulo,
    areaEstudio,
    tipoEstudio,
    estadoEstudio,
    fechaInicio,
    fechaFin,
    pais,
    id,
  } = data

  const initialValues = {
    titulo,
    areaEstudioId: areaEstudio.id,
    tipoEstudioId: tipoEstudio.id,
    estadoEstudioId: estadoEstudio.id,
    institucionEducativa: institucionEducativa.id,
    fechaFin: fechaFin ? new Date(moment(fechaFin, 'DD-MM-YYYY').toDate()) : null,
    fechaInicio: fechaInicio ? new Date(moment(fechaInicio, 'DD-MM-YYYY').toDate()) : null,
    alPresente: fechaFin === null && fechaInicio && true,
    paisId: pais.id,
  }

  const validationSchema = yup.object().shape({
    titulo: yup.string().required(i18n.t('validation:error_carrera')),
    paisId: yup
      .number()
      .required(i18n.t('validation:error_pais'))
      .nullable(i18n.t('validation:error_pais')),
    areaEstudioId: yup
      .number()
      .required(i18n.t('validation:error_area_estudio'))
      .nullable(i18n.t('validation:error_area_estudio')),
    tipoEstudioId: yup
      .number()
      .required(i18n.t('validation:error_tipo_estudio'))
      .nullable(i18n.t('validation:error_tipo_estudio')),
    estadoEstudioId: yup
      .number()
      .required(i18n.t('validation:error_estado_estudio'))
      .nullable(i18n.t('validation:error_estado_estudio')),
    institucionEducativa: yup
      .number(i18n.t('validation:error_institucion'))
      .required(i18n.t('validation:error_institucion'))
      .nullable(),
    fechaInicio: yup
      .date()
      .required(i18n.t('validation:error_fecha_inicio'))
      .nullable(i18n.t('validation:error_fecha_inicio')),
    fechaFin: yup
      .date()
      .min(yup.ref('fechaInicio'), () => i18n.t('validation:error_fecha_min_fin'))
      .nullable(i18n.t('validation:error_fecha_fin')),
  })

  return (
    <Container style={styles.container}>
      <HeaderBackScreen title={i18n.t('curriculum:estudios:title')} action={() => dismissModal(componentId)} />
      <Text style={styles.camposObligatorios}>
        <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
      </Text>

      <Content>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            saveExperienciaEducativa(values, id)
          }}
          validationSchema={validationSchema}
          isInitialValid={isInitialValid(validationSchema, initialValues)}
        >
          {({ values, errors, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
            <View>
              <Form style={styles.containerForm}>
                {/* Título / Carrera */}

                <InputUi
                  label={i18n.t('curriculum:estudios:form_edit:carrera')}
                  required
                  error={!!errors.titulo}
                  value={values.titulo}
                  setFieldValue={itemValue => {
                    setFieldValue('titulo', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('titulo')}
                  autoCompleteType="off"
                  keyboardType="default"
                  styles={{
                    item: { marginLeft: 0 },
                    inputs: styles.inputs,
                  }}
                />
                {/* ERRROR MENSSAGE */}
                {errors.titulo && <Text style={styles.errorMenssage}>{errors.titulo}</Text>}
                {/*  Institución */}

                <AutocompleteUi
                  label={i18n.t('curriculum:estudios:form_edit:institucion')}
                  initialValue={institucionEducativa.nombre}
                  data={institucionesEducativas}
                  onValueChange={itemValue => {
                    setFieldValue('institucionEducativa', itemValue)
                    setFieldTouched('institucionEducativa')
                  }}
                  placeholderColor={i18n.t('curriculum:estudios:form_edit:select_option')}
                  isValid={errors.institucionEducativa}
                />
                {/* ERRROR MENSSAGE */}
                {errors.institucionEducativa && <Text style={styles.errorMenssage}>{errors.institucionEducativa}</Text>}
                {/* Pais */}
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>
                    {i18n.t('curriculum:estudios:form_edit:pais')}
                    <Text style={styles.asterisco}> *</Text>
                  </Label>
                  <View style={[styles.containerPicker, !!errors.paisId && { borderWidth: 1, borderColor: 'red' }]}>
                    <Picker
                      mode="dialog"
                      iosIcon={<Icon name="arrow-down" />}
                      style={styles.inputPicker}
                      placeholder="Pais"
                      placeholderStyle={styles.PickerText}
                      placeholderIconColor="#007aff"
                      selectedValue={values.paisId}
                      onValueChange={async itemValue => {
                        setFieldValue('paisId', itemValue)
                        setFieldTouched('paisId')
                      }}
                    >
                      <Picker.Item label={i18n.t('curriculum:estudios:form_edit:select_option')} value={null} />
                      {getOptionPicker(paises)}
                    </Picker>
                  </View>
                </Item>
                {/* ERRROR MENSSAGE */}
                {errors.paisId && <Text style={styles.errorMenssage}>{errors.paisId}</Text>}
                {/* Area */}
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>
                    {i18n.t('curriculum:estudios:form_edit:area')}
                    <Text style={styles.asterisco}> *</Text>
                  </Label>
                  <View
                    style={[styles.containerPicker, !!errors.areaEstudioId && { borderWidth: 1, borderColor: 'red' }]}
                  >
                    <Picker
                      mode="dialog"
                      iosIcon={<Icon name="arrow-down" />}
                      style={styles.inputPicker}
                      placeholder="Area"
                      placeholderStyle={styles.PickerText}
                      placeholderIconColor="#007aff"
                      selectedValue={values.areaEstudioId}
                      onValueChange={async itemValue => {
                        setFieldValue('areaEstudioId', itemValue)
                        setFieldTouched('areaEstudioId')
                      }}
                    >
                      <Picker.Item label={i18n.t('curriculum:estudios:form_edit:select_option')} value={null} />
                      {/* AREAS */}
                      {getOptionPicker(areas)}
                    </Picker>
                  </View>
                </Item>
                {/* ERRROR MENSSAGE */}
                {errors.areaEstudioId && <Text style={styles.errorMenssage}>{errors.areaEstudioId}</Text>}
                {/* Tipo de estudio */}
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>
                    {i18n.t('curriculum:estudios:form_edit:tipo_estudio')}
                    <Text style={styles.asterisco}> *</Text>
                  </Label>
                  <View
                    style={[styles.containerPicker, !!errors.tipoEstudioId && { borderWidth: 1, borderColor: 'red' }]}
                  >
                    <Picker
                      mode="dialog"
                      iosIcon={<Icon name="arrow-down" />}
                      style={styles.inputPicker}
                      placeholder="tiposEstudios"
                      placeholderStyle={styles.PickerText}
                      placeholderIconColor="#007aff"
                      selectedValue={values.tipoEstudioId}
                      onValueChange={async itemValue => {
                        setFieldValue('tipoEstudioId', itemValue)
                        setFieldTouched('tipoEstudioId')
                      }}
                    >
                      <Picker.Item label={i18n.t('curriculum:estudios:form_edit:select_option')} value={null} />
                      {getOptionPicker(tiposEstudio)}
                    </Picker>
                  </View>
                </Item>
                {/* ERRROR MENSSAGE */}
                {errors.tipoEstudioId && <Text style={styles.errorMenssage}>{errors.tipoEstudioId}</Text>}
                {/* Estado */}
                <Item stackedLabel style={styles.item}>
                  <Label style={styles.label}>
                    {i18n.t('curriculum:estudios:form_edit:estado')}
                    <Text style={styles.asterisco}> *</Text>
                  </Label>
                  <View
                    style={[styles.containerPicker, !!errors.estadoEstudioId && { borderWidth: 1, borderColor: 'red' }]}
                  >
                    <Picker
                      mode="dialog"
                      iosIcon={<Icon name="arrow-down" />}
                      style={styles.inputPicker}
                      placeholderStyle={styles.PickerText}
                      placeholderIconColor="#007aff"
                      selectedValue={values.estadoEstudioId}
                      onValueChange={async itemValue => {
                        // limpio al presente ya que si es graduado no puede tener value
                        // eslint-disable-next-line no-unused-expressions
                        itemValue === 2 && setFieldValue('alPresente', false)
                        setFieldValue('estadoEstudioId', itemValue)
                        setFieldTouched('estadoEstudioId')
                      }}
                    >
                      <Picker.Item label={i18n.t('curriculum:estudios:form_edit:select_option')} value={null} />
                      {getOptionPicker(estadosEstudio)}
                    </Picker>
                  </View>
                </Item>
                {/* ERRROR MENSSAGE */}
                {errors.estadoEstudioId && <Text style={styles.errorMenssage}>{errors.estadoEstudioId}</Text>}
                {/* Fecha Inicio  */}
                <View style={styles.containerDate}>
                  <Item stackedLabel style={styles.itemDatePicker}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:estudios:form_edit:fecha_inicio')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[
                        styles.containerPickerDate,
                        !!errors.fechaInicio && { borderWidth: 1, borderColor: 'red' },
                      ]}
                    >
                      <DatePicker
                        minimumDate={new Date(1950, 1, 1)}
                        maximumDate={new Date()}
                        locale="es"
                        timeZoneOffsetInMinutes={undefined}
                        animationType="fade"
                        androidMode="default"
                        defaultDate={values.fechaInicio}
                        placeHolderText={
                          !values.fechaInicio && i18n.t('curriculum:estudios:form_edit:fecha_placeholder')
                        }
                        textStyle={styles.DatePickerText}
                        placeHolderTextStyle={styles.DatePickerText}
                        onDateChange={async itemValue => {
                          setFieldValue('fechaInicio', new Date(moment(itemValue, 'DD-MM-YYYY').toDate()))
                          setFieldTouched('fechaInicio')
                        }}
                        disabled={false}
                      />
                    </View>
                  </Item>

                  <Item stackedLabel style={styles.itemDatePicker}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:estudios:form_edit:fecha_finalizacion')}{' '}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[
                        styles.containerPickerDate,
                        { marginRight: 0, width: width * 0.45 },
                        !!errors.fechaFin && { borderWidth: 1, borderColor: 'red' },
                      ]}
                    >
                      <DatePicker
                        minimumDate={new Date(1980, 1, 1)}
                        maximumDate={new Date()}
                        style={styles.inputPicker}
                        locale="es"
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType="fade"
                        androidMode="default"
                        defaultDate={values.fechaFin}
                        placeHolderText={!values.fechaFin && i18n.t('curriculum:estudios:form_edit:fecha_placeholder')}
                        textStyle={[styles.DatePickerText, values.alPresente && styles.DatePickerTextDisabled]}
                        placeHolderTextStyle={[
                          styles.DatePickerText,
                          values.alPresente && styles.DatePickerTextDisabled,
                        ]}
                        onDateChange={itemValue => {
                          setFieldValue('fechaFin', new Date(moment(itemValue, 'DD-MM-YYYY').toDate()))
                          setFieldTouched('fechaFin')
                        }}
                        disabled={values.alPresente}
                      />
                    </View>
                  </Item>
                </View>
                {/* ERRROR MENSSAGE */}
                {errors.fechaInicio && (
                  <Text style={[styles.errorMenssage, { marginTop: 10 }]}>{errors.fechaInicio}</Text>
                )}
                {/* ERRROR MENSSAGE */}
                {errors.fechaFin && <Text style={[styles.errorMenssage, { marginTop: 10 }]}>{errors.fechaFin}</Text>}
                {/* Al presente */}
                <CheckBoxItem
                  style={{ borderBottomWidth: 0, marginLeft: -5, marginTop: 16, textAlign: 'left' }}
                  text={i18n.t('curriculum:estudios:form_edit:presente')}
                  value={null}
                  handleChange={() => {
                    setFieldValue('fechaFin', null)
                    setFieldValue('alPresente', !values.alPresente)
                  }}
                  disabled={values.estadoEstudioId === 2}
                  checked={values.alPresente}
                />
              </Form>

              <ButtonUi
                success
                text={i18n.t('button:button_create')}
                disabled={!isValid}
                onPress={handleSubmit}
                styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
              />
              {buttonEliminar(id)}
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default EditExperienciaEducativa
