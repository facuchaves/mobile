/* eslint-disable global-require */
import React, { useState } from 'react'
import { StyleSheet, Linking, View } from 'react-native'

import { Container, Content, Form, Text, Toast } from 'native-base'
import * as yup from 'yup'
import { Formik } from 'formik'
import Config from 'react-native-config'
import ThrottledTouchableOpacity from '../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../i18n'
import { User } from '../../api/session-service'
import { vh, vw } from '../../style/helpers'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// UI
import { ButtonUi, InputUi, Icon } from '../../shared/ui-kit'
import HeaderBackScreen from '../../shared/ui-kit/HeaderBackScreen'
import { dismissModal } from '../../navigation/helpers'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: DefaultTheme.colors.background,
    textAlign: 'center',
    margin: 0,
  },
  image: {
    alignSelf: 'center',
    alignContent: 'center',
    height: vh(160),
  },
  form: {
    padding: 0,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    color: DefaultTheme.colors.primaryText,
    marginVertical: 20,
  },
  containerIcon: {
    position: 'relative',
    top: 75,
    right: 40,
    zIndex: 1,
    alignSelf: 'flex-end',
  },
  icon: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 25,
  },
  textContrasena: {
    fontSize: 14,
    color: DefaultTheme.colors.primary,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 22,
    width: 160,
    lineHeight: 20,
  },
  buttonSubmit: {
    alignSelf: 'center',
  },
  buttonCreate: {
    alignSelf: 'center',
  },
  errrorMenssage: {
    fontSize: 11,
    color: 'red',
    marginHorizontal: 10,
    paddingLeft: 5,
  },
})

const LoginScreen = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId } = props
  const [segurity, setSegurity] = useState({
    isSecure: true,
    iconPass: 'Eye-off',
  })

  const Login = async values => {
    const { name, password } = values

    const userState = await User.login(name, password, true)
    if (userState === 'error') {
      Toast.show({
        text: i18n.t('validation:error_authentication'),
        duration: 5000,
        buttonText: 'Ok',
        type: 'danger',
      })
    }
  }

  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <HeaderBackScreen
        title={null}
        action={() => {
          dismissModal(componentId)
        }}
      />
      {/* IMAGEN Y TEXT */}
      {/*  <Image resizeMode="contain" source={require('../../images/image-pre-registro.png')} style={styles.image} /> */}
      <Text style={styles.title}>{i18n.t('login:title')}</Text>
      {/* FORM */}
      <Content>
        <Formik
          initialValues={{ name: '', password: '' }}
          onSubmit={values => Login(values)}
          validationSchema={yup.object().shape({
            name: yup.string().required(i18n.t('validation:error_user')),
            password: yup.string().required(i18n.t('validation:error_password_login')),
          })}
        >
          {({ values, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <Form style={styles.form}>
                <InputUi
                  stackedLabel
                  label={i18n.t('login:label_user')}
                  required
                  error={!!touched.name && !!errors.name}
                  value={values.name}
                  setFieldValue={itemValue => {
                    setFieldValue('name', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('name')}
                  autoCompleteType="username"
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />
                {/* ERRROR MENSSAGE */}
                {touched.name && errors.name && <Text style={styles.errrorMenssage}>{errors.name}</Text>}
                <View style={styles.containerIcon}>
                  <Icon
                    active
                    name={segurity.iconPass}
                    onPress={() => {
                      setSegurity({
                        isSecure: !segurity.isSecure,
                        iconPass: segurity.isSecure ? 'Eye-open' : 'Eye-off',
                      })
                    }}
                    onBlur={() => setFieldTouched('password')}
                    style={styles.icon}
                  />
                </View>

                <InputUi
                  stackedLabel
                  label={i18n.t('login:label_password')}
                  required
                  secureTextEntry={segurity.isSecure || false}
                  error={!!touched.password && !!errors.password}
                  value={values.password}
                  setFieldValue={itemValue => {
                    setFieldValue('password', itemValue)
                  }}
                  setFieldTouched={() => setFieldTouched('password')}
                  autoCompleteType="password"
                  keyboardType="default"
                  styles={{ item: { marginLeft: 16 }, inputs: { minWidth: vw(340) } }}
                />

                {/* ERRROR MENSSAGE */}
                {touched.password && errors.password && <Text style={styles.errrorMenssage}>{errors.password}</Text>}

                <ThrottledTouchableOpacity
                  onPress={() => {
                    Linking.openURL(`${Config.PORTAL_PATH}cambioPassword`)
                  }}
                >
                  <Text style={styles.textContrasena}>{i18n.t('login:password_lost')}</Text>
                </ThrottledTouchableOpacity>
              </Form>
              <ButtonUi
                text={i18n.t('button:button_enterokay')}
                styles={{ button: styles.buttonSubmit }}
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default LoginScreen
