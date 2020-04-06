/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import * as yup from 'yup'
import { Formik } from 'formik'
// THEMES
import { Footer, Input } from 'native-base'

import DefaultTheme from '../../../themes/DefaultTheme'
// UI
import { ButtonUi } from '../../../shared/ui-kit'
import i18n from '../../../i18n'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFF',
  },
  inputFooter: {
    height: 42,
    width,
    fontSize: 14,
    color: DefaultTheme.colors.primaryText,
    paddingLeft: 10,
    paddingBottom: 0,
    borderColor: DefaultTheme.colors.primary,
    borderEndColor: DefaultTheme.colors.primary,
  },
  buttonFooter: { fontSize: 16, fontWeight: 'bold', color: DefaultTheme.colors.primary, height: 35 },
  buttonDisabled: { fontSize: 16, fontWeight: 'bold', color: '#ccc', height: 35 },
})

const FooterChat = props => {
  // eslint-disable-next-line react/prop-types
  const { sendMessage, idChat, loading } = props
  return (
    <Footer style={styles.footer}>
      <Formik
        initialValues={{ mensaje: '' }}
        onSubmit={(values, { resetForm }) => {
          sendMessage(idChat, values)
          resetForm()
        }}
        validationSchema={yup.object().shape({
          mensaje: yup.string().required(),
        })}
      >
        {({ values, handleChange, setFieldTouched, isValid, handleSubmit }) => (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>
            <Input
              onChangeText={handleChange('mensaje')}
              placeholder={loading ? i18n.t('mensajes:chat:enviado') : i18n.t('mensajes:chat:placeholder')}
              placeholderTextColor="#999"
              autoFocus={false}
              value={values.mensaje}
              onBlur={() => setFieldTouched('mensaje')}
              style={styles.inputFooter}
              disabled={loading}
              maxLength={1000}
            />

            <ButtonUi
              transparent
              styles={{
                button: { minWidth: 80, paddingTop: 10 },
                text: isValid ? styles.buttonFooter : styles.buttonDisabled,
              }}
              text="Enviar"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </Footer>
  )
}

export default FooterChat
