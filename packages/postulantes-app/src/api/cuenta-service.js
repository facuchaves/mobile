/* eslint-disable no-console */
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import ScreenIds from '../constants/ScreenIds'
import { showModal } from '../navigation/helpers'
// eslint-disable-next-line no-unused-vars
import Request, { Put, Delete, Get, Post, Patch } from '../hooks/api/restClient'

const CuentaServices = {}

const RequestCuenta = async (method, path, body) => {
  let response = {}
  try {
    const request = new Request()
    request.path = path
    request.method = method
    request.body = body
    response = await request.call()
  } catch (error) {
    console.log(`Request cuentaService ${error} path: ${path}`)
    showModal(ScreenIds.BOOT_ERROR)
    response.error = error
    response.status = 500
    return false
  }
  return response
}

CuentaServices.getCountrySelection = async () => {
  const config = await AsyncStorage.getItem('countryInfo')
  return JSON.parse(config)
}
CuentaServices.setCountrySelection = async CountryInfo => {
  console.log(`INFO QUE LLEGA PARA GUARDAR ${JSON.stringify(CountryInfo)}`)
  await AsyncStorage.setItem('countryInfo', JSON.stringify(CountryInfo))
}

CuentaServices.getConfidencialidad = () => {
  return RequestCuenta(Get, `/ajustes/confidencialidad`, null)
}

CuentaServices.changeConfidencialidad = body => {
  return RequestCuenta(Put, `/ajustes/confidencialidad`, body)
}

CuentaServices.changePassword = body => {
  return RequestCuenta(Put, `/ajustes/changePassword`, body)
}

CuentaServices.getCuenta = body => {
  return RequestCuenta(Get, `/ajustes/cuenta`, body)
}

CuentaServices.deleteCuenta = body => {
  return RequestCuenta(Post, `/ajustes/delete-cuenta`, body)
}

CuentaServices.getSuscripciones = () => {
  return RequestCuenta(Get, `/ajustes/suscripciones`, null)
}

CuentaServices.putSuscripciones = suscripcionId => {
  return RequestCuenta(Put, `/ajustes/suscripciones/${suscripcionId}`, {})
}

CuentaServices.deleteSuscripciones = suscripcionId => {
  return RequestCuenta(Delete, `/ajustes/suscripciones/${suscripcionId}`, null)
}

CuentaServices.getAlertas = () => {
  return RequestCuenta(Get, `/ajustes/alertas`, null)
}

CuentaServices.deleteAlertas = alertaId => {
  return RequestCuenta(Delete, `/ajustes/alertas/${alertaId}`, null)
}

CuentaServices.getMensajes = () => {
  return RequestCuenta(Get, `/mensajes`)
}

CuentaServices.marcarLeidoMensaje = mensajeId => {
  return RequestCuenta(Post, `/mensajes/${mensajeId}/leido`)
}

CuentaServices.getchat = (mensajeId, type) => {
  return RequestCuenta(Get, `/mensajes/${mensajeId}/${type}`)
}

CuentaServices.sendMessage = (mensajeId, body, type) => {
  if (type === 'directo') {
    return RequestCuenta(Post, `/mensajesDirectos/${mensajeId}`, body)
  }
  return RequestCuenta(Post, `/mensajesPostulaciones/${mensajeId}`, body)
}

CuentaServices.getUnreadMessagesCount = () => {
  return RequestCuenta(Get, `/postulantes/getUnreadMessagesCount`)
}

CuentaServices.emailVerify = async email => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await RequestCuenta(Get, `/ajustes/cuenta/validate-email/${email}`)
      if (response && response.inUse) return resolve(false)
      return resolve(true)
    } catch (e) {
      return reject()
    }
  })
}

CuentaServices.changePassword.propTypes = {
  body: PropTypes.arrayOf(
    PropTypes.shape({ passwordActual: PropTypes.string.isRequired, passwordNueva: PropTypes.string.isRequired })
      .isRequired
  ).isRequired,
}

CuentaServices.deleteCuenta.propTypes = {
  body: PropTypes.arrayOf(
    PropTypes.shape({ motivo: PropTypes.string.isRequired, password: PropTypes.string.isRequired }).isRequired
  ).isRequired,
}

CuentaServices.changeConfidencialidad.propTypes = {
  tipo: PropTypes.string.isRequired,
}

export default CuentaServices
