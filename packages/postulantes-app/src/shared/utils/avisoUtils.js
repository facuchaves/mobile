import moment from 'moment'
// import { replace } from 'lodash'

/* eslint-disable import/prefer-default-export */
export const CalcularTiempoInicioPublicacion = fechaPublicacion => {
  const today = moment()
  const fecha = moment(fechaPublicacion, 'DD-MM-YYYY').format('YYYY-MM-DD')
  return `Publicado hace ${today.diff(fecha, 'days') + 1} días`
}

export const CalcularTiempoDias = fechaPublicacion => {
  const today = moment()
  const fecha = moment(fechaPublicacion, 'DD-MM-YYYY').format('YYYY-MM-DD')
  return `${today.diff(fecha, 'days')} `
}

export const NormalizarDescription = text => {
  // text.replace(/<\/?[^>]+(>|$)/g, '')
  // const textClean = replace(text, /<\/?[^>]+(>|$)/g, '')
  return text
}
