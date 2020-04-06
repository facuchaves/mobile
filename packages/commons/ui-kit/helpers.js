/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */

/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
const subtractLight = function(color, amount) {
  let cc = parseInt(color, 16) - amount
  let c = cc < 0 ? 0 : cc
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
  return c
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const darken = (color, amount) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = parseInt((255 * amount) / 100)
  const partOne = subtractLight(color.substring(0, 2), amount)
  const partTwo = subtractLight(color.substring(2, 4), amount)
  const partThree = subtractLight(color.substring(4, 6), amount)
  return `#${partOne}${partTwo}${partThree}`
}

/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
const addLight = function(color, amount) {
  let cc = parseInt(color, 16) + amount
  let c = cc > 255 ? 255 : cc
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
  return c
}

/* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const lighten = (color, amount) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = parseInt((255 * amount) / 100)
  const partOne = addLight(color.substring(0, 2), amount)
  const partTwo = addLight(color.substring(2, 4), amount)
  const partThree = addLight(color.substring(4, 6), amount)
  return `#${partOne}${partTwo}${partThree}`
}
