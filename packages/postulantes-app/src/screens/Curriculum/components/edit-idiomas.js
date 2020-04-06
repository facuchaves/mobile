/* eslint-disable global-require */
// IMPORTS
import React, { useState, useEffect } from 'react'
import { Content, Form, Item, Label, Picker, Toast } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import { remove } from 'lodash'
import * as yup from 'yup'
import { Formik } from 'formik'
import i18n from '../../../i18n'
import { vw } from '../../../style/helpers'
import { dismissModal } from '../../../navigation/helpers'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// SERVICES
import CurriculumService from '../../../api/curriculum-services'

// UI-KIT
import { Icon, Modal, ButtonUi } from '../../../shared/ui-kit'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  asterisco: {
    color: DefaultTheme.colors.error,
  },
  bloq1: {
    paddingVertical: 10,
    margin: 14,
    flex: 1,
    backgroundColor: DefaultTheme.colors.white,
    borderRadius: 8,
  },
  item: {
    borderBottomWidth: 0,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  label: {
    color: DefaultTheme.colors.labelText,
    fontSize: 16,
    paddingBottom: 5,
  },
  containerPicker: {
    backgroundColor: DefaultTheme.colors.background,
    height: 50,
    borderRadius: 8,
    elevation: 1,
  },
  inputPicker: {
    width: vw(320),
    marginTop: 0,
    marginLeft: 0,
    color: DefaultTheme.colors.primaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
  },

  PickerTextPlaceholder: {
    color: DefaultTheme.colors.tertiaryText,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    marginTop: 5,
    marginLeft: 0,
  },
  camposObligatorios: {
    marginVertical: 10,
    marginHorizontal: 16,
    marginBottom: 5,
  },
  errorMenssage: {
    alignSelf: 'flex-start',
    fontSize: 11,
    color: 'red',
    marginTop: 10,
    marginLeft: -3,
    paddingLeft: 5,
  },
})

const EditIdiomas = props => {
  // eslint-disable-next-line react/prop-types
  const { item, componentId, updateCv, idiomasData, keysIdiomas } = props

  const [idiomasHabilidatos, setIdiomasHabilidatos] = useState([])

  const saveIdioma = async (values, conocimientoIdOral, conocimientoIdEscrito) => {
    const conocimientos = [
      {
        calificadorId: 16,
        conocimientoEspecificoId: null,
        grupoId: 2,
        nivelCalificadorId: values.nivelEscrito,
        tipoId: values.idioma,
        conocimientoId: conocimientoIdEscrito,
      },
      {
        calificadorId: 17,
        conocimientoEspecificoId: null,
        grupoId: 2,
        nivelCalificadorId: values.nivelOral,
        tipoId: values.idioma,
        conocimientoId: conocimientoIdOral,
      },
    ]

    const hasError = await updateCv(CurriculumService.guardarIdiomas({ conocimientos }))

    if (!hasError) {
      setTimeout(() => {
        dismissModal(componentId)
      }, 1000)
    }
  }

  const deleteIdioma = async arrayIds => {
    await updateCv(
      CurriculumService.deleteIdioma(arrayIds).then(response => {
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

        if (!hasError) {
          dismissModal(componentId)
        }
      })
    )
  }

  const buttonEliminar = (editEnable, arrayIds) => {
    if (editEnable) {
      return (
        <ButtonUi
          transparent
          text={i18n.t('button:button_delete')}
          styles={{ text: { color: 'red' } }}
          onPress={() => {
            Modal(null, i18n.t('curriculum:idiomas:warning'), i18n.t('button:no'), null, i18n.t('button:si'), () => {
              deleteIdioma(arrayIds)
            })
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

  const filterListIdiomas = () => {
    // eslint-disable-next-line react/prop-types
    const idiomasListComplete = idiomasData.slice(0)

    const result = remove(idiomasListComplete, e => {
      return !keysIdiomas.some(element => element === e.id.toString())
    })
    return result
  }

  useEffect(() => {
    const init = async () => {
      setIdiomasHabilidatos(await filterListIdiomas())
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const conocimientoIdOral = item ? item.Oral.id : null
  const conocimientoIdEscrito = item ? item.Escrito.id : null
  const editView = item // FLAG EDIT VIEW
  const listIdiomas = editView ? idiomasData : idiomasHabilidatos

  const initialValues = {
    idioma: item ? item.Escrito.tipo.id : null,
    nivelOral: item ? item.Oral.nivel.id : null,
    nivelEscrito: item ? item.Escrito.nivel.id : null,
  }
  const validationSchema = yup.object().shape({
    idioma: yup
      .number(i18n.t('validation:error_idiomas'))
      .required(i18n.t('validation:error_idiomas'))
      .nullable(i18n.t('validation:error_idiomas')),
    nivelOral: yup
      .number(i18n.t('validation:error_idiomas_oral'))
      .required(i18n.t('validation:error_idiomas_oral'))
      .nullable(i18n.t('validation:error_idiomas_oral')),
    nivelEscrito: yup
      .number(i18n.t('validation:error_idiomas_escrito'))
      .required(i18n.t('validation:error_idiomas_escrito'))
      .nullable(i18n.t('validation:error_idiomas_escrito')),
  })

  return (
    <Content style={styles.container}>
      <HeaderBackScreen title={i18n.t('curriculum:idiomas:title')} action={() => dismissModal(componentId)} />
      <Text style={styles.camposObligatorios}>
        <Text style={styles.asterisco}> *</Text> {i18n.t('validation:campos_obligatorio')}
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          saveIdioma(values, conocimientoIdOral, conocimientoIdEscrito)
        }}
        validationSchema={validationSchema}
        isInitialValid={editView ? isInitialValid(validationSchema, initialValues) : null}
      >
        {({ values, errors, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
          <Form>
            <Content style={styles.bloq1}>
              {/* IDIOMAS */}

              <Item stackedLabel style={styles.item}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:idiomas:idiomas')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.idioma && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" color={DefaultTheme.colors.primary} />}
                    style={[styles.inputPicker, editView && { color: DefaultTheme.colors.disabled }]}
                    placeHolderText={i18n.t('curriculum:idiomas:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.idioma}
                    textStyle={editView ? styles.DatePickerTextDisabled : styles.DatePickerText}
                    onValueChange={itemValue => {
                      setFieldValue('idioma', itemValue)
                      setFieldTouched('idioma')
                    }}
                    enabled={!editView}
                  >
                    <Picker.Item label={i18n.t('curriculum:idiomas:select_option')} value={null} />
                    {listIdiomas.map(idioma => {
                      return <Picker.Item label={idioma.nombre} value={idioma.id} key={idioma.id} />
                    })}
                  </Picker>
                </View>
                {/* ERROR MENSSAGE */}
                {errors.idioma && <Text style={styles.errorMenssage}>{errors.idioma}</Text>}
              </Item>
              {/* Nivel Oral */}
              <Item stackedLabel style={styles.item}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:idiomas:nivel_oral')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.nivelOral && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" color={DefaultTheme.colors.primary} />}
                    style={styles.inputPicker}
                    placeholder={i18n.t('curriculum:idiomas:select_option')}
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.nivelOral}
                    onValueChange={async itemValue => {
                      setFieldValue('nivelOral', itemValue)

                      setFieldTouched('nivelOral')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:idiomas:select_option')} value={null} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:basico')} value={9} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:intermedio')} value={11} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:avanzado')} value={10} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:nativo')} value={12} />
                  </Picker>
                </View>
                {/* ERROR MENSSAGE */}
                {errors.nivelOral && <Text style={styles.errorMenssage}>{errors.nivelOral}</Text>}
              </Item>
              {/* Nivel Escrito */}
              <Item stackedLabel style={styles.item}>
                <Label style={styles.label}>
                  {i18n.t('curriculum:idiomas:nivel_escrito')}
                  <Text style={styles.asterisco}> *</Text>
                </Label>
                <View style={[styles.containerPicker, !!errors.nivelEscrito && { borderWidth: 1, borderColor: 'red' }]}>
                  <Picker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={styles.inputPicker}
                    placeholder="Nivel escrito"
                    placeholderStyle={styles.PickerTextPlaceholder}
                    placeholderIconColor="#007aff"
                    selectedValue={values.nivelEscrito}
                    onValueChange={async itemValue => {
                      setFieldValue('nivelEscrito', itemValue)

                      setFieldTouched('nivelEscrito')
                    }}
                  >
                    <Picker.Item label={i18n.t('curriculum:idiomas:select_option')} value={null} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:basico')} value={9} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:intermedio')} value={11} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:avanzado')} value={10} />
                    <Picker.Item label={i18n.t('curriculum:idiomas:niveles:nativo')} value={12} />
                  </Picker>
                </View>
                {/* ERROR MENSSAGE */}
                {errors.nivelEscrito && <Text style={styles.errorMenssage}>{errors.nivelEscrito}</Text>}
              </Item>
            </Content>

            <ButtonUi
              success
              text={i18n.t('button:button_create')}
              disabled={!isValid}
              onPress={handleSubmit}
              styles={{ button: { marginHorizontal: 16, marginBottom: 14 } }}
            />
            {buttonEliminar(editView, [conocimientoIdEscrito, conocimientoIdOral])}
          </Form>
        )}
      </Formik>
    </Content>
  )
}

export default EditIdiomas
