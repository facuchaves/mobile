/* eslint-disable */

/**
 *  Grid System
 */
import { gridBreakpoints, containerMaxWidths, columns, gutterWidth } from './settings'

/**
 * Generate semantic grid columns with these functions.
 */

export const makeContainer = `
  width: 100%;
  padding-right: ${gutterWidth / 2}px;
  padding-left: ${gutterWidth / 2}px;
  margin-right: auto;
  margin-left: auto;
`

export const makeContainerMaxWidth = Object.keys(containerMaxWidths).map(breakpoint => {
  return `
    @media ( min-width: ${gridBreakpoints[breakpoint]}px ) {
      max-width: ${containerMaxWidths[breakpoint]}px;
    }
  `
})

/**
 * For each breakpoint, define the maximum width of the container in a media query
 */

export const makeRow = `
  display: flex;
  flex-wrap: wrap;
  margin-right: -${gutterWidth / 2}px;
  margin-left: -${gutterWidth / 2}px;
`

/**
 * Prevent columns from becoming too narrow when at smaller grid tiers by
 * always setting width: 100%;. This works because we use flex values
 * later on to override this initial width.
 */

export const makeColReady = `
  position: relative;
  width: 100%;
  padding-right: ${gutterWidth / 2}px;
  padding-left: ${gutterWidth / 2}px;
`

/**
 * Add a `max-width` to ensure content within each column does not blow out
 * the width of the column. Applies to IE10+ and Firefox. Chrome and Safari
 * do not appear to require this.
 *
 *  props:
 *
 *  [breackpoint] = {[int]}
 *
 *  [breackpoint] = {
 *     size: [int],
 *     order: [int],
 *     offset: [int]
 *  }
 */
const makeColBreackpoint = (props, breakpoint) => {
  const size = typeof props[breakpoint] === 'object' ? props[breakpoint].size : props[breakpoint]
  const order = props[breakpoint].order ? props[breakpoint].order : null
  const offset = props[breakpoint].offset ? props[breakpoint].offset : null

  return `@media ( min-width: ${gridBreakpoints[breakpoint]}px ) {
            -ms-flex: 0 0 ${size ? (size * 100) / columns : 100}%;
            flex: 0 0 ${size ? (size * 100) / columns : 100}%;
            max-width: ${size ? (size * 100) / columns : 100}%;
            order: ${order != null ? `order: ${order};` : ''};
          }`
}

const makeSimpleCol = (props, breakpoint) => {
  return `-ms-flex-preferred-size: 0;
          flex-basis: 0;
          -ms-flex-positive: 1;
          flex-grow: 1;
          max-width: 100%;`
}

export const makeCol = props => {
  let styles = `${makeColReady}`
  let hasBreakpoints = false

  /**
   *  Chequeamos si en los props que recibimos contamos con algún breckpoint
   *  Esperamos recibir xs, sm, md, lg, xl
   */
  Object.keys(gridBreakpoints).map(breakpoint => {
    if (!hasBreakpoints) {
      hasBreakpoints = props.hasOwnProperty(breakpoint)
    }
  })

  /**
   *  Si hay breackpoints creamos la columna configurando cada uno
   */
  if (hasBreakpoints) {
    Object.keys(gridBreakpoints).map(breakpoint => {
      if (props.hasOwnProperty(breakpoint)) {
        styles += makeColBreackpoint(props, breakpoint)
      }
    })
  } else {
    styles += makeSimpleCol()
  }

  return styles
}
