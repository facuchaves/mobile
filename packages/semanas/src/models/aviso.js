import dateUtils from './dateUtils'

export default class Aviso {
  constructor(id, titulo, nombreEmpresa, ubicacion, fecha, url, logo) {
    this.id = id
    this.titulo = titulo
    this.nombreEmpresa = nombreEmpresa
    this.ubicacion = ubicacion
    this.fecha = fecha
    this.url = url
    this.logo = logo
    this.diasPublicacion = this.getDiasPublicacion()
  }

  getDiasPublicacion() {
    const cantidadDeDias = dateUtils.daysBetween(this.fecha, new Date())
    if (cantidadDeDias === 0) {
      return 'Hoy'
    }
    if (cantidadDeDias === 1) {
      return 'Ayer'
    }
    return `Hace ${cantidadDeDias} dias`
  }

  toString() {
    return (
      `id : ${this.id} \n ` +
      `Titulo : ${this.titulo} \n ` +
      `nombreEmpresa : ${this.nombreEmpresa} \n ` +
      `ubicacion : ${this.ubicacion} \n ` +
      `fecha : ${this.fecha} \n ` +
      `dias de publicacion : ${this.getFecha()} \n ` +
      `url : ${this.url} \n ` +
      `logo : ${this.logo} \n `
    )
  }
}
