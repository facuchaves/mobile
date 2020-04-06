import styled from 'styled-components'

import { MakeNav, MakeNavItem } from './mixins'

export const Nav = styled.div`
  ${props => MakeNav(props)}
`

export const NavItem = styled.div`
  ${props => MakeNavItem(props)}
`
