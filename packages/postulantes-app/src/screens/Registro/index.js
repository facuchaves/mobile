/* eslint-disable global-require */
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Container, Content, Form, Text } from 'native-base'
import * as yup from 'yup'
import { Formik } from 'formik'
import RNRestart from 'react-native-restart'
import i18n from '../../i18n'
import { dismissModal } from '../../navigation/helpers'
import { User } from '../../api/session-service'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
import { vw } from '../../style/helpers'
// UI
import { ButtonUi, InputUi } from '../../shared/ui-kit'
import HeaderBackScreen from '../../shared/ui-kit/HeaderBackScreen'

import CuentaServices from '../../api/cuenta-service'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.background,
    textAlign: 'center',
    margin: 0,
  },
  contentRegistroEnd: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    margin: 0,
    paddingHorizontal: 20,
  },
  // REGITRO STYLES
  form: {
    padding: 0,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    color: DefaultTheme.colors.primaryText,
    marginTop: 20,
  },
  buttonSubmit: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 50,
  },

  // REGISTRO SUCCESS
  regTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 24,
    marginHorizontal: 40,
    color: DefaultTheme.colors.primaryText,
  },
  regEmail: {
    fontWeight: 'bold',
    fontSize: 18,
    color: DefaultTheme.colors.secondaryText,
    lineHeight: 24,
  },
  regText: {
    marginVertical: 10,
    color: DefaultTheme.colors.secondaryText,
    fontSize: 16,
  },
})

const RegistroScreen = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId } = props
  const [userData, setUserData] = useState({})
  const [formState, setFormState] = useState()

  const registrar = async values => {
    const { name, apellido, email, password } = values
    const request = await User.registrar(name, apellido, email, password)
    if (request) {
      setUserData({ name, apellido, email, password })
      setFormState(true)
    }
  }

  if (formState) {
    return (
      <Container style={styles.contentRegistroEnd}>
        <Text style={styles.regTitle}>{i18n.t('registro:success:welcome')(userData.name)}</Text>
        <Text style={styles.regText}>{i18n.t('registro:success:title')}</Text>
        <Text style={styles.regEmail}>{userData.email}</Text>
        <Text style={styles.regText}>{i18n.t('registro:success:subtitle')}</Text>
        <ButtonUi
          success
          text={i18n.t('registro:success:button_submit')}
          styles={{ button: styles.buttonSubmit }}
          onPress={async () => {
            RNRestart.Restart()
          }}
        />
      </Container>
    )
  }

  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <HeaderBackScreen
        title={i18n.t('registro:header_title')}
        action={() => {
          dismissModal(componentId)
        }}
      />
      <Text style={styles.title}>{i18n.t('registro:title')}</Text>
      {/* FORM */}
      <Content>
        <Formik
          initialValues={{ name: '', apellido: '', email: '', password: '', checkpassword: '' }}
          onSubmit={values => registrar(values)}
          validateOnChange={false}
          validateOnBlur
          validationSchema={yup.object().shape({
            name: yup.string().required(i18n.t('validation:error_nombre')),
            apellido: yup.string().required(i18n.t('validation:error_apellido')),
            email: yup
              .string()
              .email(i18n.t('validation:error_validate_email'))
              .required(i18n.t('validation:error_email'))
              .test('unique-email', i18n.t('validation:error_email_en_uso'), value =>
                CuentaServices.emailVerify(value)
              ),
            password: yup
              .string()
              .min(6, i18n.t('validation:error_min_characters')(6))
              .required(i18n.t('validation:error_password')),
            checkpassword: yup
              .string()
              .min(6, i18n.t('validation:error_min_characters')(6))
              .oneOf([yup.ref('password'), null], i18n.t('validation:error_password_not_match'))
              .required(i18n.t('validation:error_repeat_password')),
          })}
        >
          {({ values, setFieldValue, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
              <Form style={styles.form}>
                <InputUi
                  stackedLabel
                  label={i18n.t('registro:form:label_nombre')}
                  required
                  error={!!touched.name && !!errors.name}
                  value={values.name}
                  setFieldValue={itemValue => {
                    setFieldValue('name', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('name')}
                  autoCompleteType="off"
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.name && errors.name && <Text style={DefaultTheme.errrorMenssage}>{errors.name}</Text>}
                <InputUi
                  stackedLabel
                  label={i18n.t('registro:form:label_apellido')}
                  required
                  error={!!touched.apellido && !!errors.apellido}
                  value={values.apellido}
                  setFieldValue={itemValue => {
                    setFieldValue('apellido', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('apellido')}
                  autoCompleteType="off"
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.apellido && errors.apellido && (
                  <Text style={DefaultTheme.errrorMenssage}>{errors.apellido}</Text>
                )}
                <InputUi
                  stackedLabel
                  label={i18n.t('registro:form:label_email')}
                  required
                  error={!!touched.email && !!errors.email}
                  value={values.email}
                  setFieldValue={itemValue => {
                    setFieldValue('email', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('email')}
                  autoCompleteType="off"
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.email && errors.email && <Text style={DefaultTheme.errrorMenssage}>{errors.email}</Text>}

                <InputUi
                  stackedLabel
                  label={i18n.t('registro:form:label_password')}
                  required
                  secureTextEntry
                  autoCompleteType="password"
                  error={!!touched.password && !!errors.password}
                  value={values.password}
                  setFieldValue={itemValue => {
                    setFieldValue('password', itemValue)
                    if (!values.password) {
                      setFieldValue('checkpassword', '') // limpio el valor de checkpassword si no tiene password
                    }
                  }}
                  setFieldTouched={() => setFieldTouched('password')}
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.password && errors.password && (
                  <Text style={DefaultTheme.errrorMenssage}>{errors.password}</Text>
                )}

                <InputUi
                  stackedLabel
                  label={i18n.t('registro:form:label_repertir_password')}
                  required
                  autoCompleteType="password"
                  disabled={!values.password}
                  secureTextEntry
                  error={!!touched.checkpassword && !!errors.checkpassword}
                  value={values.password ? values.checkpassword : ''}
                  setFieldValue={itemValue => {
                    setFieldValue('checkpassword', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('checkpassword')}
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.checkpassword && errors.checkpassword && (
                  <Text style={DefaultTheme.errrorMenssage}>{errors.checkpassword}</Text>
                )}
              </Form>
              <ButtonUi
                success
                text={i18n.t('registro:form:button_create')}
                styles={{ button: styles.buttonSubmit }}
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default RegistroScreen
