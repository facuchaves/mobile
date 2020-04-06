import { createGlobalStyle } from 'styled-components'
import { makeGlobalStyles } from './mixins'
/**
 * Container widths
 * Set the container width, and override it for fixed navbars in media queries.
 */

export const GlobalStyles = createGlobalStyle`
  ${props => makeGlobalStyles(props)}`
