import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'lodash'

import { themes, PortalTheme } from '.'

export const forEachTheme = componentCase => {
  return (
    <>
      {map(themes, (theme, portal) => (
        <PortalTheme key={portal} portal={portal}>
          {componentCase({ theme })}
        </PortalTheme>
      ))}
    </>
  )
}

export const ForEachTheme = ({ children }) => {
  const componentCase = typeof children === 'function' ? children : () => children
  return forEachTheme(componentCase)
}

ForEachTheme.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}
