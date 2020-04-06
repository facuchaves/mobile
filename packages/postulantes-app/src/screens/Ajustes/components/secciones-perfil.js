/* eslint-disable no-console */
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Formik } from 'formik'
import ThrottledTouchableOpacity from '../../../components/commons/ThrottledTouchableOpacity'
import i18n from '../../../i18n'
// UI-KIT
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
import { Icon, SwitchUi } from '../../../shared/ui-kit'

// CONST
const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 24,
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: DefaultTheme.colors.border,
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
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: DefaultTheme.colors.secondary,
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
})

export const SeccionPerfil = ({ icon, titulo, texto, action }) => {
  return (
    <ThrottledTouchableOpacity onPress={action}>
      <View style={styles.container}>
        {icon ? <Icon name={icon.name} size={icon.size} color="#24282C" style={{ opacity: 0.28 }} /> : null}
        <View style={styles.containerText}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.texto}>{texto}</Text>
        </View>
      </View>
    </ThrottledTouchableOpacity>
  )
}

export const SeccionPerfilPrivacidad = ({ icon, titulo, action, confidencialidad }) => {
  const stateConfidencialidad = confidencialidad === 'publico'

  return (
    <View style={styles.container}>
      {icon ? <Icon name={icon.name} size={icon.size} color="#24282C" style={{ opacity: 0.28 }} /> : null}
      <View style={styles.containerText}>
        <View style={styles.containerForm}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Formik
            initialValues={{ privacidad: stateConfidencialidad }}
            validationSchema={yup.object().shape({
              privacidad: yup.boolean(),
            })}
          >
            {({ setFieldValue }) => (
              <View style={styles.containerSwitch}>
                <SwitchUi
                  onValueChange={itemValue => {
                    setFieldValue('privacidad', itemValue)
                    action(itemValue ? 'publico' : 'privado')
                  }}
                  value={stateConfidencialidad}
                  textlabel={stateConfidencialidad ? 'Público' : 'Privado'}
                  onColor={DefaultTheme.colors.primary}
                  offColor="#ccc"
                  stylesLabel={{
                    color: stateConfidencialidad ? DefaultTheme.colors.primary : '#ccc',
                    fontSize: 16,
                    lineHeight: 16,
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
        <Text style={styles.texto}>
          {!stateConfidencialidad
            ? i18n.t('curriculum:ajustes:cuenta:perfil:privacidad_privado')
            : i18n.t('curriculum:ajustes:cuenta:perfil:privacidad_publico')}
        </Text>
      </View>
    </View>
  )
}

SeccionPerfil.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object]),
  titulo: PropTypes.string.isRequired,
  texto: PropTypes.string,
  action: PropTypes.func.isRequired,
}

SeccionPerfil.defaultProps = {
  icon: null,
  texto: null,
}

SeccionPerfilPrivacidad.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object]),
  titulo: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  confidencialidad: PropTypes.string,
}

SeccionPerfilPrivacidad.defaultProps = {
  icon: null,
  confidencialidad: 'publico',
}
