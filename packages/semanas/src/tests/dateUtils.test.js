import dateUtils from '../models/dateUtils'

it('Hoy - Hoy = 0', () => {
  const daysBetween = dateUtils.daysBetween(new Date(), new Date())
  expect(daysBetween).toBe(0)
})

it('Hoy - Ayer = 1', () => {
  const daysBetween = dateUtils.daysBetween(new Date(), dateUtils.obtenerFecha(-1))
  expect(daysBetween).toBe(1)
})

it('Ayer - Hoy = 1', () => {
  const daysBetween = dateUtils.daysBetween(dateUtils.obtenerFecha(-1), new Date())
  expect(daysBetween).toBe(1)
})

it('Diferencia de 2 dias.', () => {
  const daysBetween = dateUtils.daysBetween(new Date(), dateUtils.obtenerFecha(-2))
  expect(daysBetween).toBe(2)
})

it('Diferencia de 3 dias.', () => {
  const daysBetween = dateUtils.daysBetween(new Date(), dateUtils.obtenerFecha(3))
  expect(daysBetween).toBe(3)
})
