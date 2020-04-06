/* eslint-disable no-console */
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Toast, Root } from 'native-base'
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks'
import { dismissModal } from '../../../navigation/helpers'
// SERVICES
import CuentaService from '../../../api/cuenta-service'
import { User } from '../../../api/session-service'
import i18n from '../../../i18n'
// THEME
import DefaultTheme from '../../../themes/DefaultTheme'
// UI-KIT
import { Modal } from '../../../shared/ui-kit'
import HeaderBackScreen from '../../../shared/ui-kit/HeaderBackScreen'
import { SeccionPerfil, SeccionPerfilPrivacidad } from './secciones-perfil'
import { SeccionEditPassword, SeccionDeleteCuenta } from './seccion-form-perfil'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
  },
  containerItem: {
    margin: 20,
    marginLeft: 24,
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  h1: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    color: '#0582F0',
    marginTop: 20,
  },
  copyRight: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 16,
    color: '#24282C',
    marginTop: 20,
  },
})

const MiPerfil = props => {
  const [Page, setPage] = useState({
    // editEmail: false,
    editPassword: false,
    editDeleteCuenta: false,
    confidencialidad: null,
  })

  const deleteCuenta = async values => {
    let res = null
    try {
      Modal(
        i18n.t('curriculum:ajustes:cuenta:perfil:delete_button_submit'),
        i18n.t('curriculum:ajustes:cuenta:perfil:warning_delete'),
        i18n.t('button:no'),
        null,
        i18n.t('button:si'),
        async () => {
          res = await CuentaService.deleteCuenta(values)
          if (!res.error) {
            User.logout()
          } else {
            Toast.show({
              text: i18n.t('validation:error_request'),
              buttonText: 'Ok',
              duration: 10000,
              type: 'danger',
              position: 'bottom',
            })
          }
        }
      )
    } catch (error) {
      console.log(i18n.t('validation:error_request'), Error)
    }
  }

  const getConfidencialidad = async () => {
    const res = await CuentaService.getConfidencialidad()
    return res.tipo
  }

  const changeConfidencialidad = async value => {
    await CuentaService.changeConfidencialidad({ tipo: value })
    setPage({ ...Page, confidencialidad: value })
  }

  const changePassword = async value => {
    let res = null
    try {
      res = await CuentaService.changePassword(value)
      setPage({ ...Page, editPassword: false })
    } catch (error) {
      console.log(i18n.t('validation:error_request'), error)
    }
    if (!res.error) {
      Toast.show({
        text: i18n.t('response:save_request'),
        buttonText: 'Ok',
        duration: 10000,
        type: 'success',
        position: 'bottom',
      })
    } else {
      Toast.show({
        text: i18n.t('validation:error_request'),
        buttonText: 'Ok',
        duration: 10000,
        type: 'danger',
        position: 'bottom',
      })
    }
  }
  // eslint-disable-next-line react/prop-types
  const { componentId } = props

  useNavigationComponentDidAppear(async () => {
    const res = await getConfidencialidad()
    setPage({ ...Page, confidencialidad: res })
  }, componentId)

  return (
    <Root>
      <Container style={styles.container}>
        {/* HEADER */}
        <HeaderBackScreen
          title={i18n.t('curriculum:ajustes:cuenta:perfil:header_title')}
          action={() => dismissModal(componentId)}
        />

        <Content style={styles.containerButtons}>
          {/*   {editEmail ? (
            <SeccionEditEmail
              titulo="Cambiar mi mail"
              texto="Para confirmar tu email actual debés completar el campo con la nueva dirección de email. Se enviará a tu nueva dirección un correo para confirmar el cambio."
              email={email}
              closeForm={() => this.setState({ editEmail: !editEmail })}
              action={values => {
                console.log(values)
              }}
            />
          ) : (
            <SeccionPerfil
              titulo="Cambiar mi mail"
              texto={email}
              icon={null}
              action={() => {
                this.setState({ editEmail: !editEmail })
              }}
            />
          )} */}
          <SeccionPerfilPrivacidad
            titulo={i18n.t('curriculum:ajustes:cuenta:perfil:privacidad_title')}
            icon={null}
            confidencialidad={Page.confidencialidad}
            action={value => {
              changeConfidencialidad(value)
            }}
          />
          {Page.editPassword ? (
            <SeccionEditPassword
              titulo={i18n.t('curriculum:ajustes:cuenta:perfil:change_password_title')}
              texto=""
              closeForm={() => setPage({ ...Page, editPassword: !Page.editPassword })}
              action={values => changePassword(values)}
            />
          ) : (
            <SeccionPerfil
              titulo={i18n.t('curriculum:ajustes:cuenta:perfil:change_password_title')}
              texto={i18n.t('curriculum:ajustes:cuenta:perfil:change_password_subtitle')}
              icon={null}
              action={() => {
                setPage({ ...Page, editPassword: !Page.editPassword })
              }}
            />
          )}

          {Page.editDeleteCuenta ? (
            <SeccionDeleteCuenta
              titulo={i18n.t('curriculum:ajustes:cuenta:perfil:delete_title')}
              texto=""
              closeForm={() => setPage({ ...Page, editDeleteCuenta: !Page.editDeleteCuenta })}
              action={values => {
                deleteCuenta(values)
              }}
            />
          ) : (
            <SeccionPerfil
              titulo={i18n.t('curriculum:ajustes:cuenta:perfil:delete_title')}
              texto={i18n.t('curriculum:ajustes:cuenta:perfil:delete_subtitle')}
              icon={null}
              action={() => {
                setPage({ ...Page, editDeleteCuenta: !Page.editDeleteCuenta })
              }}
            />
          )}
        </Content>
      </Container>
    </Root>
  )
}

export default MiPerfil
