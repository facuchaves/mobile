import styled from 'styled-components'
import { makeContainerMaxWidth, makeContainer, makeRow, makeCol } from './mixins'

/**
 * Container widths
 * Set the container width, and override it for fixed navbars in media queries.
 */

export const Container = styled.div`
  ${makeContainer}
  ${makeContainerMaxWidth}
`

/**
 * Fluid container
 * Utilizes the mixin meant for fixed width containers, but with 100% width for
 * fluid, full width layouts.
 */
export const ContainerFluid = styled.div`
  ${makeContainer}
`

/**
 * Row
 * Rows contain and clear the floats of your columns.
 */
export const Row = styled.div`
  ${makeRow}

  & .no-gutters {
    margin-right: 0;
    margin-left: 0;

    > .col,
    > [class*='col-'] {
      padding-right: 0;
      padding-left: 0;
    }
  }
`

export const Col = styled.div`
  ${props => makeCol(props)}
`
