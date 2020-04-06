import Aviso from '../models/aviso'
import dateUtils from '../models/dateUtils'

it('Aviso con fecha de hoy.', () => {
  const aviso = new Aviso('', '', '', '', new Date(), '', '')
  expect(aviso.getDiasPublicacion()).toBe('Hoy')
})

it('Aviso con fecha de ayer.', () => {
  const aviso = new Aviso('', '', '', '', dateUtils.obtenerFecha(-1), '', '')
  expect(aviso.getDiasPublicacion()).toBe('Ayer')
})

it('Aviso hace 2 dias', () => {
  const aviso = new Aviso('', '', '', '', dateUtils.obtenerFecha(-2), '', '')
  expect(aviso.getDiasPublicacion()).toBe('Hace 2 dias')
})
