import moment from 'moment'

class DateUtils {
  daysBetween(date1, date2) {
    // Get 1 day in milliseconds
    const oneDayInMs = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    const date1InMs = date1.getTime()
    const date2InMs = date2.getTime()

    // Calculate the difference in milliseconds
    const differenceInMs = Math.abs(date2InMs - date1InMs)

    // Convert back to days and return
    return Math.round(differenceInMs / oneDayInMs)
  }

  obtenerFecha(cantidadDias) {
    const date = new Date()
    date.setDate(date.getDate() + cantidadDias)
    return date
  }

  /**
   *
   * @param {fecha en formato yyyy-MM-dd} fechaStr
   */
  parsearFecha(fechaStr) {
    const dateSplitted = fechaStr.split('-')
    return new Date(dateSplitted[2], dateSplitted[1] - 1, dateSplitted[0])
  }

  /**
   *
   * @param {fecha en formato yyyy-MM-dd} fechaStr
   */
  getDiasPublicacion(fecha) {
    console.log('fechafechafechafecha', fecha)

    const cantidadDeDias = this.daysBetween(moment(fecha, 'DD-MM-YYYY').toDate(), new Date())
    if (cantidadDeDias === 0) {
      return 'Hoy'
    }
    if (cantidadDeDias === 1) {
      return 'Ayer'
    }
    return `Hace ${cantidadDeDias} dias`
  }
}

export const dateUtils = new DateUtils()
