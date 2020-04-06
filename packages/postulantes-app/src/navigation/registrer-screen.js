/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
import React from 'react'
import { Navigation } from 'react-native-navigation'
// CONTEXT
import { AppProvider } from '../context/AppContext'
import ScreenIds from '../constants/ScreenIds'

const registerScreens = () => {
  /**
   * REGISTRO CON CONTEXT
   */

  registerRootScreen(ScreenIds.ONBOARDING, require('../screens/onboarding').default)
  registerRootScreen(ScreenIds.BOOT_ERROR, require('../screens/Errors').default)
  registerRootScreen(ScreenIds.HOME, require('../screens/Home').default)
  registerRootScreen(ScreenIds.MIS_POSTULACIONES, require('../screens/MisPostulaciones').default)
  registerRootScreen(ScreenIds.CURRICULUM, require('../screens/Curriculum').default)
  registerRootScreen(ScreenIds.MENSAJES, require('../screens/Mensajes').default)
  registerRootScreen(ScreenIds.PRE_LOGIN, require('../screens/Login/PreLoginSreen').default)
  registerRootScreen(ScreenIds.LOGIN, require('../screens/Login/LoginScreen').default)
  registerRootScreen(ScreenIds.BUSCADOR, require('../screens/Busquedas').default)
  registerRootScreen(ScreenIds.LISTADO_AVISOS, require('../screens/ListadoAvisos').default)
  registerRootScreen(
    ScreenIds.EDIT_DATOS_CONTACTO,
    require('../screens/Curriculum/components/edit-datos-contacto').default
  )
  registerRootScreen(
    ScreenIds.EDIT_REFERENCIA_LABORAL,
    require('../screens/Curriculum/components/edit-referencia-laboral').default
  )
  registerRootScreen(
    ScreenIds.EDIT_REFERENCIA_EDUCATIVA,
    require('../screens/Curriculum/components/edit-referencia-educativa').default
  )
  registerRootScreen(
    ScreenIds.EDIT_DATOS_PERSONALES,
    require('../screens/Curriculum/components/edit-datos-personales').default
  )
  registerRootScreen(
    ScreenIds.EDIT_EXPERIENCIA_LABORAL,
    require('../screens/Curriculum/components/edit-experiencia-laboral').default
  )

  registerRootScreen(ScreenIds.REGISTRO, require('../screens/Registro').default)
  /**
   * SIN CONTEXT
   */
  Navigation.registerComponent(ScreenIds.CHAT, () => require('../screens/Mensajes/ChatScreen').default)
  Navigation.registerComponent(ScreenIds.FICHA_AVISO, () => require('../screens/FichaAviso').default)
  Navigation.registerComponent(
    ScreenIds.PREGUNTAS,
    () => require('../screens/FichaAviso/preguntas-modal/preguntas').default
  )
  Navigation.registerComponent(
    ScreenIds.CARTA_PRESENTACION,
    () => require('../screens/FichaAviso/carta-presentacion/carta-presentacion').default
  )
  Navigation.registerComponent(ScreenIds.AJUSTES, () => require('../screens/Ajustes').default)
  Navigation.registerComponent(ScreenIds.INFO, () => require('../screens/Ajustes/components/info').default)

  Navigation.registerComponent(
    ScreenIds.NOTIFICACIONES,
    () => require('../screens/Ajustes/components/notificaciones').default
  )

  Navigation.registerComponent(ScreenIds.MI_PERFIL, () => require('../screens/Ajustes/components/mi-perfil').default)

  Navigation.registerComponent(
    ScreenIds.EDIT_EXPERIENCIA_EDUCATIVA,
    () => require('../screens/Curriculum/components/edit-experiencia-educativa').default
  )
  Navigation.registerComponent(
    ScreenIds.EDIT_IDIOMAS,
    () => require('../screens/Curriculum/components/edit-idiomas').default
  )

  Navigation.registerComponent(
    ScreenIds.MODAL_VIDEO,
    () => require('../shared/ui-kit/components/video/modal-video').default
  )
}

/**
 * Register Listeners
 */

// eslint-disable-next-line no-unused-vars
Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {
  // eslint-disable-next-line no-console
  // console.log(`Touched tab ${selectedTabIndex}`)
})

/**
 * Wrappers
 */

export function registerRootScreen(name, Component) {
  Navigation.registerComponent(
    name,
    () => props => (
      <AppProvider>
        <Component {...props} />
      </AppProvider>
    ),
    () => Component
  )
}

/**
 * Exports
 */

export { registerScreens }
