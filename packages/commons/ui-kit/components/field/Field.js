import styled from 'styled-components'
import { makeField } from './mixins'

export const Field = styled.div`
  ${props => makeField(props)}
`
