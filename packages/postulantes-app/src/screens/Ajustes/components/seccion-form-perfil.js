/* eslint-disable no-console */
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Formik } from 'formik'
import { isEmpty } from 'lodash'
import { Content, Form } from 'native-base'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { InputUi, ButtonUi, TextArea } from '../../../shared/ui-kit'

// CONST
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.colors.border,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: DefaultTheme.colors.background,
  },
  containerText: {
    margin: 10,
    marginLeft: 20,
    flexDirection: 'column',
    alignContent: 'center',
  },
  containerForm: {
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  containerSwitch: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    right: 0,
    marginTop: 2,
  },
  titulo: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: DefaultTheme.colors.secondary,
    fontWeight: 'bold',
  },
  texto: {
    width: width * 0.8,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: DefaultTheme.colors.primaryText,
    marginTop: 5,
  },
  errorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 5,
    marginLeft: 0,
    paddingLeft: 0,
  },
  // TEXT AREA

  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    margin: 10,
    marginTop: 3,
    paddingLeft: 5,
  },
})

const isInitialValid = (validationSchema, initialValues) => {
  if (!validationSchema) return true
  return validationSchema.isValidSync(initialValues)
}

export const SeccionEditEmail = ({ titulo, texto, action, email, closeForm }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(i18n.t('validation:error_email'))
      .required(i18n.t('validation:error_email')),
  })
  return (
    <Content style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Text style={styles.texto}>{texto}</Text>

        <Formik
          initialValues={{ email }}
          onSubmit={values => action(values)}
          validationSchema={validationSchema}
          isInitialValid={isInitialValid(validationSchema, { email })}
        >
          {({ values, setFieldValue, setFieldTouched, touched, errors, handleSubmit }) => (
            <Form>
              <InputUi
                label="email"
                required
                error={!!errors.email}
                value={values.email}
                setFieldValue={itemValue => {
                  setFieldValue('email', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('email')}
                autoCompleteType="email"
                keyboardType="default"
                styles={null}
              />
              {/* ERROR MENSSAGE */}
              {touched.email && errors.email && <Text style={styles.errorMenssage}>{errors.email}</Text>}
              <ButtonUi success text="Cambiar mail" styles={null} disabled={!isEmpty(errors)} onPress={handleSubmit} />
              <ButtonUi
                transparent
                text="Cancelar"
                styles={{ text: { color: DefaultTheme.colors.primary, fontWeight: 'bold' } }}
                disabled={false}
                onPress={() => closeForm()}
              />
            </Form>
          )}
        </Formik>
      </View>
    </Content>
  )
}

export const SeccionEditPassword = ({ titulo, texto, action, closeForm }) => {
  const initialValues = { passwordOld: null, passwordNew: null, passwordNewCheck: null }
  const validationSchema = yup.object({
    passwordOld: yup
      .string()
      .min(6, i18n.t('validation:error_min_characters')(6))
      .required(i18n.t('validation:error_old_password'))
      .nullable(i18n.t('validation:error_old_password')),
    passwordNew: yup
      .string()
      .min(6, i18n.t('validation:error_min_characters')(6))
      .required(i18n.t('validation:error_new_password'))
      .nullable(i18n.t('validation:error_new_password')),
    passwordNewCheck: yup
      .string()
      .min(6, i18n.t('validation:error_min_characters')(6))
      .oneOf([yup.ref('passwordNew'), null], i18n.t('validation:error_password_not_match'))
      .required(i18n.t('validation:error_repeat_password'))
      .nullable(i18n.t('validation:error_password_not_match')),
  })
  return (
    <Content style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Text style={styles.texto}>{texto}</Text>

        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            action({
              passwordActual: values.passwordOld,
              passwordNueva: values.passwordNew,
            })
          }
          validationSchema={validationSchema}
          isInitialValid={isInitialValid(validationSchema, initialValues)}
        >
          {({ values, setFieldValue, setFieldTouched, touched, errors, isValid, handleSubmit }) => (
            <Form>
              <InputUi
                label={i18n.t('curriculum:ajustes:cuenta:perfil:actual')}
                required
                error={!!errors.passwordOld}
                value={values.passwordOld}
                secureTextEntry
                setFieldValue={itemValue => {
                  setFieldValue('passwordOld', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('passwordOld')}
                styles={null}
              />
              {/* ERROR MENSSAGE */}
              {touched.passwordOld && errors.passwordOld && (
                <Text style={styles.errorMenssage}>{errors.passwordOld}</Text>
              )}
              <InputUi
                label={i18n.t('curriculum:ajustes:cuenta:perfil:nueva')}
                required
                error={!!errors.passwordNew}
                value={values.passwordNew}
                secureTextEntry
                setFieldValue={itemValue => {
                  setFieldValue('passwordNew', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('passwordNew')}
                styles={null}
              />
              {/* ERROR MENSSAGE */}
              {touched.passwordNew && errors.passwordNew && (
                <Text style={styles.errorMenssage}>{errors.passwordNew}</Text>
              )}

              <InputUi
                label={i18n.t('curriculum:ajustes:cuenta:perfil:repetir')}
                required
                // disabled={!!values.passwordNew}
                secureTextEntry
                value={values.passwordNew ? values.passwordNewCheck : ''}
                error={!!errors.passwordNewCheck}
                setFieldValue={itemValue => {
                  setFieldValue('passwordNewCheck', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('passwordNewCheck')}
                styles={null}
              />
              {/* ERROR MENSSAGE */}
              {touched.passwordNewCheck && errors.passwordNewCheck && (
                <Text style={styles.errorMenssage}>{errors.passwordNewCheck}</Text>
              )}
              <ButtonUi
                success
                text={i18n.t('curriculum:ajustes:cuenta:perfil:button_submit')}
                styles={{ button: { marginTop: 24 } }}
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <ButtonUi
                transparent
                text={i18n.t('button:button_cancel')}
                styles={{ text: { color: DefaultTheme.colors.primary, fontWeight: 'bold' } }}
                disabled={false}
                onPress={() => closeForm()}
              />
            </Form>
          )}
        </Formik>
      </View>
    </Content>
  )
}

export const SeccionDeleteCuenta = ({ titulo, texto, action, closeForm }) => {
  const initialValues = { password: null, menssage: null }
  const validationSchema = yup.object({
    password: yup
      .string()
      .required(i18n.t('validation:error_old_password'))
      .nullable(i18n.t('validation:error_old_password')),
    menssage: yup.string().nullable(),
  })
  return (
    <Content style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Text style={styles.texto}>{texto}</Text>

        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            action({
              motivo: values.menssage,
              password: values.password,
            })
          }
          validationSchema={validationSchema}
          isInitialValid={isInitialValid(validationSchema, initialValues)}
        >
          {({ values, setFieldValue, setFieldTouched, touched, errors, isValid, handleSubmit }) => (
            <Form>
              <InputUi
                label={i18n.t('curriculum:ajustes:cuenta:perfil:actual')}
                required
                error={!!errors.password}
                value={values.password}
                setFieldValue={itemValue => {
                  setFieldValue('password', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('password')}
                styles={null}
              />
              {/* ERROR MENSSAGE */}
              {touched.password && errors.password && <Text style={styles.errorMenssage}>{errors.password}</Text>}
              <TextArea
                label={i18n.t('curriculum:ajustes:cuenta:perfil:delete_optional')}
                rowSpan={5}
                bordered={false}
                maxLength={250}
                placeholder={null}
                value={values.menssage ? String(values.menssage) : ''}
                onChangeText={itemValue => {
                  setFieldValue('menssage', itemValue)
                }}
                setFieldTouched={() => setFieldTouched('menssage')}
                styles={{
                  itemTextArea: { borderBottomWidth: 0 },
                }}
              />
              {/* ERROR MENSSAGE */}
              {touched.passwordNew && errors.passwordNew && (
                <Text style={styles.errorMenssage}>{errors.passwordNew}</Text>
              )}

              <ButtonUi
                success
                text={i18n.t('curriculum:ajustes:cuenta:perfil:delete_button_submit')}
                styles={null}
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <ButtonUi
                transparent
                text={i18n.t('button:button_cancel')}
                styles={{ text: { color: DefaultTheme.colors.primary, fontWeight: 'bold' } }}
                disabled={false}
                onPress={() => closeForm()}
              />
            </Form>
          )}
        </Formik>
      </View>
    </Content>
  )
}

SeccionEditEmail.propTypes = {
  email: PropTypes.string,
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string,
  action: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
}

SeccionEditEmail.defaultProps = {
  email: null,
  texto: null,
}

SeccionEditPassword.propTypes = {
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string,
  action: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
}

SeccionEditPassword.defaultProps = {
  texto: null,
}

SeccionDeleteCuenta.propTypes = {
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string,
  action: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
}

SeccionDeleteCuenta.defaultProps = {
  texto: '',
}
