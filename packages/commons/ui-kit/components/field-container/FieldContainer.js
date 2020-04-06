import styled from 'styled-components'
import { makeFieldContainer } from './mixins'

export const FieldContainer = styled.div`
  ${props => makeFieldContainer(props)}
`
