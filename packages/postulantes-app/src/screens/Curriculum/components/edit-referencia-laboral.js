/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
// IMPORTS
import React, { useState } from 'react'
import { Content, Form, Item, Label, Picker, Row, Grid, Col, Toast } from 'native-base'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { find } from 'lodash'
import * as yup from 'yup'
import { Formik } from 'formik'

import i18n from '../../../i18n'
import { dismissModal } from '../../../navigation/helpers'

// SERVICES
import CurriculumService from '../../../api/curriculum-services'

// UI-KIT
import { Icon, Modal, ButtonUi, InputUi } from '../../../shared/ui-kit'
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
  bloq1: {
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
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    paddingBottom: 5,
  },
  inputs: {
    width: vw(330),
    backgroundColor: DefaultTheme.colors.background,
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
    elevation: 0,
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
    elevation: 0,
    backgroundColor: DefaultTheme.colors.background,
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
    color: DefaultTheme.colors.primaryText,
    fontSize: 11,
    textAlign: 'left',
  },
  camposObligatorios: {
    margin: 10,
    marginBottom: 5,
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

const EditReferenciaLaboral = props => {
  // eslint-disable-next-line react/prop-types
  const { experiencias, componentId, data, updateCv } = props

  const deleteReferenciaLaboral = async id => {
    await updateCv(
      CurriculumService.deleteReleacionLaboral(id).then(response => {
        const hasError = response.status === 500
        if (hasError) {
          Toast.show({
            text: i18n.t('validation:error_request'),
            buttonText: 'Ok',
            duration: 10000,
            type: 'danger',
            position: 'bottom',
          })
        }

        dismissModal(componentId)
      })
    )
  }

  const saveReferenciaLaboral = async (values, id) => {
    const hasError = await updateCv(CurriculumService.guardarReferenciaLaboral(values, id))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 3000)
    }
  }

  const buttonEliminar = id => {
    if (id) {
      return (
        <ButtonUi
          transparent
          danger
          text={i18n.t('button:button_delete')}
          styles={{ text: { color: 'red' } }}
          onPress={() => {
            Modal(
              null,
              i18n.t('curriculum:referencia_laboral:warning'),
              i18n.t('button:no'),
              null,
              i18n.t('button:si'),
              () => {
                deleteReferenciaLaboral(id)
              }
            )
          }}
        />
      )
    }
    return <Text />
  }

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  const { relacion, puesto, email, telefono, nombre, apellido, id, referenciaId } = data

  const initialValues = {
    nombre,
    apellido,
    relacion,
    experienciaLaboralId: referenciaId, // id
    puesto,
    email,
    telefonoPrefijo: telefono.prefijo,
    telefonoNumero: telefono.numero,
  }
  const validationSchema = yup.object().shape({
    nombre: yup.string().required(i18n.t('validation:error_un_nombre')),
    apellido: yup.string().required(i18n.t('validation:error_un_apellido')),
    email: yup
      .string()
      .email(i18n.t('validation:error_un_email'))
      .required(i18n.t('validation:error_un_email')),
    telefonoPrefijo: yup.number().required(i18n.t('validation:error_un_telefono')),
    telefonoNumero: yup.number().required(i18n.t('validation:error_un_telefono')),
    experienciaLaboralId: yup
      .string()
      .required(i18n.t('validation:error_experiencia_relacion'))
      .nullable(i18n.t('validation:error_experiencia_relacion')),
    relacion: yup
      .string()
      .required(i18n.t('validation:error_relacion'))
      .nullable(i18n.t('validation:error_relacion')),
  })

  return (
    <Content style={styles.container}>
      <HeaderBackScreen
        title={i18n.t('curriculum:referencia_laboral:title')}
        action={() => dismissModal(componentId)}
      />
      <Text style={styles.camposObligatorios}>
        <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          saveReferenciaLaboral(values, id)
        }}
        validationSchema={validationSchema}
        isInitialValid={isInitialValid(validationSchema, initialValues)}
      >
        {({ values, errors, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
          <Form>
            <Content style={styles.bloq1}>
              {/* Nombre */}

              <InputUi
                label={i18n.t('curriculum:referencia_laboral:edit_form:nombre')}
                required
                error={!!errors.nombre}
                value={values.nombre}
                setFieldValue={itemValue => {
                  setFieldValue('nombre', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('nombre')}
                styles={{
                  item: { marginLeft: 0 },
                  inputs: styles.inputs,
                }}
              />
              {/* ERRROR MENSSAGE */}
              {errors.nombre && <Text style={styles.errorMenssage}>{errors.nombre}</Text>}
              {/* Apellido */}
              <InputUi
                label={i18n.t('curriculum:referencia_laboral:edit_form:apellido')}
                required
                error={!!errors.apellido}
                value={values.apellido}
                setFieldValue={itemValue => {
                  setFieldValue('apellido', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('apellido')}
                styles={{
                  item: { marginLeft: 0 },
                  inputs: styles.inputs,
                }}
              />
              {/* ERROR MENSSAGE */}
              {errors.apellido && <Text style={styles.errorMenssage}>{errors.apellido}</Text>}
              {/* Email */}
              <InputUi
                label={i18n.t('curriculum:referencia_laboral:edit_form:email')}
                required
                error={!!errors.email}
                value={values.email}
                setFieldValue={itemValue => {
                  setFieldValue('email', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('email')}
                styles={{
                  item: { marginLeft: 0 },
                  inputs: styles.inputs,
                }}
              />
              {/* ERROR MENSSAGE */}
              {errors.email && <Text style={styles.errorMenssage}>{errors.email}</Text>}

              {/* TELEFONO */}
              <Text style={[styles.label, { marginTop: 10 }]}>
                {i18n.t('curriculum:referencia_laboral:edit_form:telefono')} <Text style={styles.asterisco}> *</Text>
              </Text>
              <View style={styles.containerTelefono}>
                <InputUi
                  label={null}
                  required
                  error={!!errors.telefonoPrefijo}
                  value={values.telefonoPrefijo}
                  setFieldValue={itemValue => {
                    setFieldValue('telefonoPrefijo', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('telefonoPrefijo')}
                  autoCompleteType="cc-number"
                  keyboardType="numeric"
                  styles={{ inputs: styles.inputPrefijo, label: styles.label }}
                />
                <InputUi
                  label={null}
                  required
                  error={!!errors.telefonoNumero}
                  value={values.telefonoNumero}
                  setFieldValue={itemValue => {
                    setFieldValue('telefonoNumero', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('telefonoNumero')}
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
              {errors.telefonoPrefijo || errors.telefonoNumero ? (
                <Text style={[styles.errorMenssage, { marginTop: -10 }]}>{i18n.t('validation:error_un_telefono')}</Text>
              ) : null}

              {/* Relacion */}
              <Item stackedLabel style={styles.item}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:referencia_laboral:edit_form:relacion')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.relacion && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:referencia_laboral:edit_form:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.relacion}
                    onValueChange={async itemValue => {
                      setFieldValue('relacion', itemValue)
                      setFieldTouched('relacion')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:referencia_laboral:edit_form:select_option')} value={null} />
                    <Picker.Item label="Fue mi jefa/e" value="jefe" />
                    <Picker.Item label="Compañera/o" value="par" />
                    <Picker.Item label="He sido su jefa/e" value="subordinado" />
                  </Picker>
                </View>
              </Item>
              {/* ERROR MENSSAGE */}
              {errors.relacion && <Text style={styles.errorMenssage}>{errors.relacion}</Text>}
              {/* Experiencia */}
              <Item stackedLabel style={styles.item}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:referencia_laboral:edit_form:experiencia_relacion')}{' '}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View
                  style={[
                    styles.containerPicker,
                    !!errors.experienciaLaboralId && { borderWidth: 1, borderColor: 'red' },
                  ]}
                >
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:referencia_laboral:edit_form:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.experienciaLaboralId}
                    onValueChange={async itemValue => {
                      setFieldValue('experienciaLaboralId', itemValue)
                      if (itemValue) {
                        setFieldValue('puesto', find(experiencias, { id: itemValue }).detalle.split('-')[1])
                      }
                      setFieldTouched('experienciaLaboralId')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:referencia_laboral:edit_form:select_option')} value={null} />

                    {experiencias.map(item => {
                      return <Picker.Item label={item.detalle} value={item.id} key={item.id} />
                    })}
                  </Picker>
                </View>
              </Item>
              {/* ERROR MENSSAGE */}
              {errors.experienciaLaboralId && <Text style={styles.errorMenssage}>{errors.experienciaLaboralId}</Text>}
            </Content>

            <ButtonUi
              success
              text={i18n.t('button:button_create')}
              disabled={!isValid}
              onPress={handleSubmit}
              styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
            />
            {buttonEliminar(id)}
          </Form>
        )}
      </Formik>
    </Content>
  )
}

export default EditReferenciaLaboral
