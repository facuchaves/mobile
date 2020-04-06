import PropTypes from 'prop-types'
import styled from 'styled-components'

const ThemedButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  background: ${props => props.theme.colors.primary.normal};
  color: ${props => props.theme.colors.primary.darken};
  border: 2px solid ${props => props.theme.colors.primary.lighten};
`

ThemedButton.propTypes = {
  children: PropTypes.node,
}

ThemedButton.defaultProps = {
  children: null,
}

export default ThemedButton
