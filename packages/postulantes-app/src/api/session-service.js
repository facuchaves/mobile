/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage'
import RNRestart from 'react-native-restart'
import NetInfo from '@react-native-community/netinfo'
// import store from '../storages/session.store'
import moment from 'moment'
import CurriculumService from './curriculum-services'
import Request, { Post } from '../hooks/api/restClient'
import ScreenIds from '../constants/ScreenIds'
import { showModal } from '../navigation/helpers'

export const User = {}

const SESSION_TTL = 3 // EN DIAS

User.login = async (user, pass, restart) => {
  let statusUser = ''
  try {
    const request = new Request()
    request.path = `/autentificacion/login/`
    request.body = {
      username: user,
      password: pass,
    }
    request.method = Post

    const response = await request.call()

    if (response.access_token) {
      await AsyncStorage.setItem('token_auth_postulante', response.access_token)
      await AsyncStorage.setItem('refresh_token', response.refresh_token)
      await AsyncStorage.setItem('expires_in', JSON.stringify(response.expires_in))
      // Se agrega un dato adicional al manejo de session
      // un session ttl exclusivo para la app
      await AsyncStorage.setItem(
        'session_expire',
        moment()
          .add(SESSION_TTL, 'days')
          .format()
      )
      if (restart) {
        RNRestart.Restart()
      }
    }
  } catch (error) {
    // Error si fue bad credentials o internet connection
    const connection = await NetInfo.fetch()
    if (connection.isInternetReachable) {
      console.log('hola')
      statusUser = 'error'
      console.log(`ERROR EN REQUEST ${error}`)
    } else {
      showModal(ScreenIds.BOOT_ERROR, { restart: true })
    }
  }
  return statusUser
}

User.checkLogin = async () => {
  // CHEQUEAR ESTADO DE USUARIO
  const token = await AsyncStorage.getItem('token_auth_postulante')
  const sessionExpire = await AsyncStorage.getItem('session_expire')

  // CHECK TTL SESSION
  if (token) {
    const expire = moment().diff(moment(sessionExpire))

    if (expire > 0) {
      // Si pasa el periodo se borra la session
      User.logout()
    }
  }

  return token
}

User.logout = async () => {
  await AsyncStorage.removeItem('token_auth_postulante')
  await AsyncStorage.removeItem('refresh_token')
  await AsyncStorage.removeItem('expires_in')
  await AsyncStorage.removeItem('session_expire')

  RNRestart.Restart()
}

User.registrar = async (nombre, apellido, email, password) => {
  let response = null
  try {
    const request = new Request()
    request.path = `/autentificacion/register/`
    request.body = {
      email,
      password,
    }
    console.log(request.body)
    request.method = Post
    response = await request.call()

    await User.login(email, password, false)
    await CurriculumService.guardarDatosPersonales({
      nombre,
      apellido,
      paisNacimientoId: null,
      fechaNacimiento: null,
      genero: null,
      tipoDocumentoId: null,
      documento: null,
      discapacidadDetalle: false,
      estadoCivilId: null,
      tieneMovilidadPropia: false,
      tieneLicenciaConducir: false,
    })
  } catch (error) {
    console.log(`ERROR EN REQUEST ${error}`)
    response = 'error'
  }
  return response
}
