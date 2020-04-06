/* eslint-disable */

/**
 *  Alert settings
 */

import styled, { keyframes } from 'styled-components'

export const makeAlert = props => {
  return `${makeSimpleAlert()}
          ${alertVariant(props.theme, props.variant)}`
}

const alertPaddingX = `1.25rem`
const alertPaddingY = `.75rem`
const alertMarginBottom = `1rem`
const alertBorderRadius = `.25rem`
const alertLinkFontWeight = `bold`
const alertBorderWidth = `1px`

/**
 * Función encargada de crear las variantes de Alertas disponibles.
 * success, danger, warning, info
 */
const makeSimpleAlert = () => {
  return `position: relative;
          top: 0;
          right: 0;
          left: 0;
          overflow: hidden;
          padding: ${alertPaddingY} ${alertPaddingX};
          border: ${alertBorderWidth} solid transparent;
          border-radius: ${alertBorderRadius};

          button{
            position:absolute;
            right:0;
            top:0;
          }`
}

const alertVariant = (theme, variant) => {
  return `color: ${theme.alerts[variant].color};
          background-color: ${theme.alerts[variant].bg};
          border: 1px solid ${theme.alerts[variant].border};`
}

const slideInDown = keyframes`
0% {
  transform: translateY(-130%);
}

100% {
  transform: translateY(0%);
}
`

export const SlideInDown = styled.div`
  animation: ${slideInDown} 0.5s ease-in-out;
  overflow: hidden;
`
