/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React, { useState, useEffect } from 'react'
import { Container, Content, Form, Item, Label, DatePicker, Picker, Root, Toast } from 'native-base'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import moment from 'moment'
import * as yup from 'yup'
import { Formik } from 'formik'
import { dismissModal } from '../../../navigation/helpers'
// SERVICES
import CurriculumService from '../../../api/curriculum-services'
import StaticEntitiesStore from '../../../storages/staticEntities.store'
import StaticEntities from '../../../api/static-entities-services'
import i18n from '../../../i18n'
// UI-KIT
import { Icon, Modal, ButtonUi, InputUi, TextArea } from '../../../shared/ui-kit'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'

// THEME
import { vw } from '../../../style/helpers'
import DefaultTheme from '../../../themes/DefaultTheme'

const { width } = Dimensions.get('window')

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
    width: vw(330),
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
  },
  textAreaContainer: {
    marginBottom: 0,
    alignSelf: 'flex-start',
  },
  textAreaLabel: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    textAlign: 'left',
    paddingBottom: 5,
  },
  textArea: {
    width: vw(330),
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.primaryText,
  },
  /**
   *  PICKER STANDAR
   */
  containerPicker: {
    backgroundColor: DefaultTheme.colors.background,
    height: 50,
    marginHorizontal: 0,
    borderRadius: 8,
    alignSelf: 'flex-start',
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
    marginLeft: 0,
  },
  inputPicker: {
    width: vw(335),
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
    paddingBottom: 5,
    borderBottomColor: 'white',
    marginLeft: 5,
    marginTop: 0,
    height: 'auto',
    borderBottomWidth: 0,
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

const EditExperienciaLaboral = props => {
  const { data, componentId, updateCv } = props
  const [paises] = useState(StaticEntitiesStore.getState().paises)
  const [areas] = useState(StaticEntitiesStore.getState().areas)
  const [subAreas, setSubAreas] = useState([])
  const [industrias] = useState(StaticEntitiesStore.getState().industrias)
  const [isLoading, setIsLoading] = useState(true)

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

  const saveExperienciaLaboral = async (values, id) => {
    const body = values
    body.fechaInicio = moment(values.fechaInicio).format('DD-MM-YYYY')
    body.fechaFin = values.fechaFin ? moment(values.fechaFin).format('DD-MM-YYYY') : null
    const hasError = await updateCv(CurriculumService.guardarExperienciaLaboral(body, id))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 1000)
    }
  }

  const deleteExperienciaLaboral = async id => {
    await updateCv(
      CurriculumService.deleteExperienciaLaboral(id).then(response => {
        const hasError = response.status === 500
        if (hasError) {
          Toast.show({
            text: i18n.t('validation:error_request'),
            buttonText: 'Okay',
            duration: 10000,
            type: 'danger',
            position: 'bottom',
          })
        }

        setTimeout(() => {
          dismissModal(componentId)
        }, 3000)
      })
    )
  }

  const buttonEliminar = id => {
    if (id) {
      return (
        <ButtonUi
          transparent
          danger
          text={<Text style={{ color: 'red' }}> {i18n.t('button:button_delete')}</Text>}
          onPress={() => {
            Modal(
              null,
              i18n.t('curriculum:experiencia:form_edit:warning'),
              i18n.t('button:no'),
              null,
              i18n.t('button:si'),
              () => {
                deleteExperienciaLaboral(id)
              }
            )
          }}
        />
      )
    }
    return <Text />
  }

  useEffect(() => {
    const init = async () => {
      const { area } = data
      const dataSubarea = area !== '' ? await StaticEntities.getSubAreas(area.id) : []
      setSubAreas(dataSubarea.subareas)
      setIsLoading(false)
    }
    init()
  }, [data])

  const {
    empresa,
    puesto,
    fechaInicio,
    fechaFin,
    detalle,
    manejaPresupuesto,
    cantidadPersonasACargo,
    area,
    subArea,
    industria,
    nivelPuesto,
    pais,
    id,
  } = data

  const initialValues = {
    empresa,
    puesto,
    fechaFin: fechaFin ? new Date(moment(fechaFin, 'DD-MM-YYYY').toDate()) : null,
    fechaInicio: fechaInicio ? new Date(moment(fechaInicio, 'DD-MM-YYYY').toDate()) : null,
    alPresente: fechaFin === null && fechaInicio && true,
    detalle,
    manejaPresupuesto,
    cantidadPersonasACargo,
    areaId: area ? area.id : null,
    subAreaId: subArea ? subArea.id : null,
    industriaId: industria ? industria.id : null,
    nivelPuestoId: nivelPuesto ? nivelPuesto.id : null,
    paisId: pais ? pais.id : null,
  }
  const validationSchema = yup.object().shape({
    empresa: yup.string().required(i18n.t('validation:error_empresa')),
    puesto: yup.string().required(i18n.t('validation:error_puesto')),
    fechaInicio: yup.date().required(i18n.t('validation:error_fecha_inicio')),
    fechaFin: yup
      .date()
      .min(yup.ref('fechaInicio'), () => i18n.t('validation:error_fecha_min_fin'))
      .nullable(i18n.t('validation:error_fecha_fin')),
    nivelPuestoId: yup
      .number()
      .required(i18n.t('validation:error_experiencia'))
      .nullable(i18n.t('validation:error_experiencia')),
    paisId: yup
      .number()
      .required(i18n.t('validation:error_pais'))
      .nullable(i18n.t('validation:error_pais')),
    areaId: yup
      .number()
      .required(i18n.t('validation:error_area_puesto'))
      .nullable(i18n.t('validation:error_area_puesto')),
    subAreaId: yup
      .number()
      .required(i18n.t('validation:error_subarea_puesto'))
      .nullable(i18n.t('validation:error_subarea_puesto')),
    industriaId: yup
      .number()
      .required(i18n.t('validation:error_actividad_empresa'))
      .nullable(i18n.t('validation:error_actividad_empresa')),
    detalle: yup
      .string()
      .required(i18n.t('validation:error_resposabilidad'))
      .nullable(i18n.t('validation:error_resposabilidad')),
  })

  if (isLoading) {
    return <Text />
  }

  return (
    <Root>
      <Container style={styles.container}>
        <HeaderBackScreen
          title={i18n.t('curriculum:experiencia:form_edit:title')}
          action={() => dismissModal(componentId)}
        />
        <Text style={styles.camposObligatorios}>
          <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
        </Text>

        <Content>
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              saveExperienciaLaboral(values, id)
            }}
            validationSchema={validationSchema}
            isInitialValid={isInitialValid(validationSchema, initialValues)}
          >
            {({ values, handleChange, errors, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
              <View>
                <Form style={styles.containerForm}>
                  {/* Puesto */}
                  <InputUi
                    label={i18n.t('curriculum:experiencia:form_edit:puesto')}
                    required
                    error={!!errors.puesto}
                    value={values.puesto}
                    setFieldValue={itemValue => {
                      setFieldValue('puesto', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('puesto')}
                    autoCompleteType="off"
                    keyboardType="default"
                    styles={{
                      item: { marginLeft: 0 },
                      inputs: styles.inputs,
                    }}
                  />
                  {/* ERRROR MENSSAGE */}
                  {errors.puesto && <Text style={styles.errorMenssage}>{errors.puesto}</Text>}
                  {/* Empresa */}

                  <InputUi
                    label={i18n.t('curriculum:experiencia:form_edit:empresa')}
                    required
                    error={!!errors.empresa}
                    value={values.empresa}
                    setFieldValue={itemValue => {
                      setFieldValue('empresa', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('empresa')}
                    autoCompleteType="off"
                    keyboardType="default"
                    styles={{
                      item: { marginLeft: 0 },
                      inputs: styles.inputs,
                    }}
                  />
                  {/* ERRROR MENSSAGE */}
                  {errors.empresa && <Text style={styles.errorMenssage}>{errors.empresa}</Text>}
                  {/* Fecha Inicio  */}
                  <View style={styles.containerDate}>
                    <Item stackedLabel style={styles.itemDatePicker}>
                      <Label style={styles.label}>
                        {i18n.t('curriculum:experiencia:form_edit:fecha_inicio')}
                        <Text style={styles.asterisco}> *</Text>
                      </Label>
                      <View
                        style={[
                          styles.containerPickerDate,
                          !!errors.fechaInicio && { borderWidth: 1, borderColor: 'red' },
                        ]}
                      >
                        <DatePicker
                          // defaultDate={new Date(2018, 1, 1)}
                          minimumDate={new Date(1950, 1, 1)}
                          maximumDate={new Date()}
                          locale="es"
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType="fade"
                          androidMode="default"
                          defaultDate={values.fechaInicio}
                          placeHolderText={
                            !values.fechaInicio && i18n.t('curriculum:experiencia:form_edit:fecha_placeholder')
                          }
                          textStyle={styles.DatePickerText}
                          placeHolderTextStyle={styles.DatePickerText}
                          onDateChange={async itemValue => {
                            setFieldValue('fechaInicio', new Date(moment(itemValue, 'DD-MM-YYYY').toDate()))
                            setFieldTouched('fechaInicio')
                          }}
                        />
                      </View>
                    </Item>

                    <Item stackedLabel style={styles.itemDatePicker} error={!!errors.fechaFin}>
                      <Label style={styles.label}>
                        {i18n.t('curriculum:experiencia:form_edit:fecha_finalizacion')}
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
                          // defaultDate={new Date(2018, 1, 1)}
                          minimumDate={new Date(1950, 1, 1)}
                          maximumDate={new Date()}
                          style={styles.inputPicker}
                          locale="es"
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType="fade"
                          androidMode="default"
                          defaultDate={values.fechaFin}
                          placeHolderText={
                            !values.fechaFin && i18n.t('curriculum:experiencia:form_edit:fecha_placeholder')
                          }
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
                  {errors.fechaFin && <Text style={[styles.errorMenssage, { marginTop: 10 }]}>{errors.fechaFin}</Text>}
                  {/* Al presente */}

                  <CheckBoxItem
                    style={{ borderBottomWidth: 0, marginLeft: -5, marginTop: 10, textAlign: 'left' }}
                    text={i18n.t('curriculum:experiencia:form_edit:presente')}
                    value={null}
                    handleChange={() => {
                      setFieldValue('fechaFin', null)
                      setFieldValue('alPresente', !values.alPresente)
                    }}
                    checked={values.alPresente}
                  />
                  {/* Nivel de experiencia */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:experiencia:form_edit:nivel_experiencia')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[styles.containerPicker, !!errors.nivelPuestoId && { borderWidth: 1, borderColor: 'red' }]}
                    >
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholderStyle={styles.PickerText}
                        placeholderIconColor="#007aff"
                        selectedValue={values.nivelPuestoId}
                        onValueChange={async itemValue => {
                          setFieldValue('nivelPuestoId', itemValue)
                          setFieldTouched('nivelPuestoId')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:experiencia:form_edit:select_option')} value={null} />

                        <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:training')}
                          value={1}
                        />
                        <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:junior')}
                          value={2}
                        />
                        <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:semiSenior')}
                          value={3}
                        />
                        <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:senior')}
                          value={4}
                        />
                        {/*  <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:generencia')}
                          value={4}
                        /> */}
                        {/*    <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:otro')}
                          value={5}
                        /> */}
                        {/*    <Picker.Item
                          label={i18n.t('curriculum:experiencia:form_edit:nivel_puesto_options:primer')}
                          value={6}
                        /> */}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MENSSAGE */}
                  {errors.nivelPuestoId && <Text style={styles.errorMenssage}>{errors.nivelPuestoId}</Text>}
                  {/* Pais */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:experiencia:form_edit:pais')}
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
                        <Picker.Item label={i18n.t('curriculum:experiencia:form_edit:select_option')} value={null} />
                        {getOptionPicker(paises)}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MENSSAGE */}
                  {errors.paisId && <Text style={styles.errorMenssage}>{errors.paisId}</Text>}
                  {/* Area */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:experiencia:form_edit:area')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View style={[styles.containerPicker, !!errors.areaId && { borderWidth: 1, borderColor: 'red' }]}>
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholder={i18n.t('curriculum:experiencia:form_edit:select:option')}
                        placeholderStyle={styles.PickerText}
                        placeholderIconColor="#007aff"
                        selectedValue={values.areaId}
                        onValueChange={async itemValue => {
                          setFieldValue('areaId', itemValue)
                          setFieldTouched('areaId')
                          setFieldValue('subAreaId', itemValue)
                          const subareasRefresh = await StaticEntities.getSubAreas(itemValue)
                          await setSubAreas(subareasRefresh.subareas)
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:experiencia:form_edit:select_option')} value={null} />
                        {/* AREAS */}
                        {getOptionPicker(areas)}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MENSSAGE */}
                  {errors.areaId && <Text style={styles.errorMenssage}>{errors.areaId}</Text>}
                  {/* Subarea */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:experiencia:form_edit:subarea')}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[styles.containerPicker, !!errors.subAreaId && { borderWidth: 1, borderColor: 'red' }]}
                    >
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholder="SubArea"
                        placeholderStyle={styles.PickerText}
                        placeholderIconColor="#007aff"
                        selectedValue={values.subAreaId}
                        onValueChange={async itemValue => {
                          setFieldValue('subAreaId', itemValue)
                          setFieldTouched('subAreaId')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:experiencia:form_edit:select_option')} value={null} />
                        {getOptionPicker(subAreas)}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MENSSAGE */}
                  {errors.subAreaId && <Text style={styles.errorMenssage}>{errors.subAreaId}</Text>}
                  {/* Actividad de la empresa */}
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>
                      {i18n.t('curriculum:experiencia:form_edit:actividad_empresa')}{' '}
                      <Text style={styles.asterisco}> *</Text>
                    </Label>
                    <View
                      style={[styles.containerPicker, !!errors.industriaId && { borderWidth: 1, borderColor: 'red' }]}
                    >
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputPicker}
                        placeholderStyle={styles.PickerText}
                        placeholderIconColor="#007aff"
                        selectedValue={values.industriaId}
                        onValueChange={async itemValue => {
                          setFieldValue('industriaId', itemValue)
                          setFieldTouched('industriaId')
                        }}
                      >
                        <Picker.Item label={i18n.t('curriculum:experiencia:form_edit:select_option')} value={null} />
                        {getOptionPicker(industrias)}
                      </Picker>
                    </View>
                  </Item>
                  {/* ERROR MENSSAGE */}
                  {errors.industriaId && <Text style={styles.errorMenssage}>{errors.industriaId}</Text>}
                  {/* Descripcion */}

                  <TextArea
                    label={i18n.t('curriculum:experiencia:form_edit:responsabilidades')}
                    rowSpan={5}
                    required
                    error={!!errors.detalle}
                    bordered={false}
                    maxLength={250}
                    value={values.detalle ? String(values.detalle) : ''}
                    onChangeText={itemValue => {
                      setFieldValue('detalle', itemValue)
                    }}
                    setFieldTouched={() => setFieldTouched('detalle')}
                    styles={{
                      TextArea: styles.textArea,
                      itemTextArea: styles.textAreaContainer,
                      label: styles.textAreaLabel,
                    }}
                  />
                  {/* ERROR MENSSAGE */}
                  {errors.detalle && <Text style={styles.errorMenssage}>{errors.detalle}</Text>}
                  {/* Personas a cargo */}

                  <InputUi
                    label={i18n.t('curriculum:experiencia:form_edit:personas_a_cargo')}
                    value={values.cantidadPersonasACargo ? values.cantidadPersonasACargo.toString() : null}
                    onChangeText={handleChange('cantidadPersonasACargo')}
                    onBlur={() => setFieldTouched('cantidadPersonasACargo')}
                    autoCompleteType="off"
                    keyboardType="numeric"
                    styles={{
                      item: { marginLeft: 0 },
                      inputs: styles.inputs,
                    }}
                  />
                  {/* Presupuesto */}
                  <CheckBoxItem
                    style={{ borderBottomWidth: 0, marginLeft: -5, textAlign: 'left' }}
                    text={i18n.t('curriculum:experiencia:form_edit:presupuesto')}
                    value={null}
                    handleChange={() => setFieldValue('manejaPresupuesto', !values.manejaPresupuesto)}
                    checked={values.manejaPresupuesto}
                  />
                </Form>

                <ButtonUi
                  styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
                  text={i18n.t('button:button_create')}
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
                {buttonEliminar(id)}
              </View>
            )}
          </Formik>
        </Content>
      </Container>
    </Root>
  )
}

export default EditExperienciaLaboral
