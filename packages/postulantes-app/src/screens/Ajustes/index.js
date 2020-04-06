// IMPORTS
import React from 'react'
import { Content, Container } from 'native-base'
import { StyleSheet } from 'react-native'
import Config from 'react-native-config'
import PropTypes from 'prop-types'
import i18n from '../../i18n'
import { User } from '../../api/session-service'
import { showModal, dismissModal } from '../../navigation/helpers'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// UI-KIT
import { Modal } from '../../shared/ui-kit'
import HeaderBackScreen from '../../shared/ui-kit/HeaderBackScreen'
import { Seccion } from './components/secciones'

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
  },
  containerButtons: {
    marginTop: 20,
  },
})

const Ajustes = props => {
  // eslint-disable-next-line react/prop-types
  const { componentId } = props

  const cerrarSession = () => {
    Modal(
      i18n.t('curriculum:ajustes:session:title'),
      i18n.t('curriculum:ajustes:session:warning'),
      i18n.t('button:no'),
      null,
      i18n.t('button:si'),
      () => User.logout()
    )
  }

  const { Cv } = props
  return (
    <Container style={styles.container}>
      {/* HEADER */}
      <HeaderBackScreen title={i18n.t('curriculum:ajustes:header_title')} action={() => dismissModal(componentId)} />

      <Content style={styles.containerButtons}>
        <Seccion
          titulo={i18n.t('curriculum:ajustes:notificaciones:title')}
          texto={i18n.t('curriculum:ajustes:notificaciones:subtitle')}
          icon={{ name: 'Notification-on', size: 40 }}
          action={async () => {
            showModal('NOTIFICACIONES', {})
          }}
        />
        <Seccion
          titulo={i18n.t('curriculum:ajustes:cuenta:title')}
          texto={i18n.t('curriculum:ajustes:cuenta:subtitle')}
          icon={{ name: 'Person', size: 40 }}
          action={() =>
            showModal('MI_PERFIL', {
              email: Cv.datosPersonales.email || null,
            })
          }
        />
        <Seccion
          titulo={i18n.t('curriculum:ajustes:session:title')}
          texto={Cv.datosPersonales.email || null}
          icon={{ name: 'Log-out', size: 40 }}
          action={() => cerrarSession()}
        />
        <Seccion
          titulo={i18n.t('curriculum:ajustes:info:title')(Config.PORTAL)}
          texto={null}
          icon={{ name: 'Info', size: 40, style: { marginTop: -10 } }}
          action={() => {
            showModal('INFO', {})
          }}
        />
      </Content>
    </Container>
  )
}

Ajustes.propTypes = {
  Cv: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default Ajustes
