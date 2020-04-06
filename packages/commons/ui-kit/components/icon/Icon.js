import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeIcon } from './mixins'
import spriteUrl from '../../assets/build/sprite.svg'

const I = styled.i`
  ${props => makeIcon(props)}
`

export const Icon = props => {
  const { name } = props
  return <I className={`icon-${name}`} {...props} source={spriteUrl} />
}

Icon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  name: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  color: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  size: PropTypes.object.isRequired,
}
