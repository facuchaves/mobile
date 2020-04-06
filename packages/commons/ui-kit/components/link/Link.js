/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { MakeLink } from './mixins'

const LinkComponent = styled(NavLink)`
  ${props => MakeLink(props)}
`

export const Link = props => {
  return (
    <LinkComponent {...props} to={{ pathname: props.href, hash: props.hash, search: props.search, exact: props.exact }}>
      {props.children}
    </LinkComponent>
  )
}
