/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// IMPORTS
import React, { useState } from 'react'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import { StyleSheet, Dimensions, View } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
import i18n from '../../../i18n'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import CurriculumService from '../../../api/curriculum-services'

// UI-KIT
import { Icon, ButtonUi, InputUi } from '../../../shared/ui-kit'

// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { vw } from '../../../style/helpers'

const { width } = Dimensions.get('screen')

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
  datoDefault: {
    color: '#000',
    fontWeight: 'normal',
    fontSize: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.colors.border,
    marginLeft: 0,
    paddingLeft: 0,
  },
  inputs: {
    width: width / 1.15,
    marginLeft: 0,
    fontSize: 16,
    textAlign: 'left',
    height: 38,
    padding: 0,
    paddingLeft: 0,
  },
  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 0,
    paddingLeft: 10,
  },
})

const PreferenciaSalarial = props => {
  const { salario, updateCv } = props
  const [Page, setPage] = useState({
    editeSalario: false,
  })

  const isInitialValid = (validationSchema, initialValues) => {
    if (!validationSchema) return true
    return validationSchema.isValidSync(initialValues)
  }

  const initialValues = { salario: salario ? salario.toString() : null }
  const validationSchema = yup.object().shape({
    salario: yup
      .number(i18n.t('validation:error_salario'))
      .required(i18n.t('validation:error_salario'))
      .nullable(i18n.t('validation:error_salario')),
  })

  if (!Page.editeSalario) {
    return (
      <Content padder style={styles.container}>
        <Card style={styles.box}>
          <CardItem header style={styles.containerTitulo}>
            <Body>
              <Text style={styles.titulo}>{i18n.t('curriculum:salario:title')}</Text>
            </Body>
            <View>
              <ThrottledTouchableOpacity
                onPress={() => {
                  // eslint-disable-next-line no-console
                  setPage({ ...Page, editeSalario: true })
                }}
              >
                <Icon name="Edit-1" color={DefaultTheme.colors.primary} size={25} style={{ marginTop: 0 }} />
              </ThrottledTouchableOpacity>
            </View>
          </CardItem>
          <CardItem style={styles.box}>
            <Body>
              <Text style={styles.datoDefault}>{i18n.t('curriculum:salario:salario')(salario)}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }

  // FORM EDITOR DE SALARIO
  return (
    <Content padder style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          const responseError = await updateCv(CurriculumService.guardarSalario(values))
          if (!responseError) {
            // si respondieron error no sacamos el form
            setPage({ ...Page, editeSalario: false })
          }
        }}
        validationSchema={validationSchema}
        isInitialValid={isInitialValid(validationSchema, initialValues)}
      >
        {({ values, setFieldValue, errors, setFieldTouched, isValid, touched, handleSubmit }) => (
          <Card style={styles.box}>
            <CardItem header bordered style={styles.containerTitulo}>
              <Body>
                <Text style={styles.titulo}>{i18n.t('curriculum:salario:title')}</Text>
              </Body>
              <View>
                <ThrottledTouchableOpacity
                  onPress={() => {
                    setPage({ ...Page, editeSalario: false })
                  }}
                >
                  <Icon name="Close" color={DefaultTheme.colors.primaryText} size={28} style={{ marginTop: 0 }} />
                </ThrottledTouchableOpacity>
              </View>
            </CardItem>
            <CardItem style={styles.box}>
              <InputUi
                placeholder={i18n.t('curriculum:salario:title_edit')}
                required
                transparent
                error={!!errors.salario}
                value={values.salario}
                setFieldValue={itemValue => {
                  setFieldValue('salario', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('salario')}
                autoCompleteType="name"
                keyboardType="numeric"
                styles={{ inputs: { minWidth: vw(320) } }}
              />
            </CardItem>
            {/* ERRROR MENSSAGE */}
            {touched.salario && errors.salario && <Text style={styles.errrorMenssage}>{errors.salario}</Text>}

            <ButtonUi
              text={i18n.t('button:button_create')}
              disabled={!isValid}
              onPress={handleSubmit}
              styles={{ button: { marginHorizontal: 16, marginBottom: 16 } }}
            />
          </Card>
        )}
      </Formik>
    </Content>
  )
}

export default PreferenciaSalarial
