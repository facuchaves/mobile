import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { SiteIds } from '@navent-jobs/config'

import { GlobalStyles } from '../components'
import zonajobs from './skins/zonajobs'
import bumeran from './skins/bumeran'
import konzerta from './skins/konzerta'
import multitrabajos from './skins/multitrabajos'
import laborum from './skins/laborum'

export const themes = {
  zonajobs,
  bumeran,
  konzerta,
  multitrabajos,
  laborum,
}

const portalsBySiteId = {
  [SiteIds.BMAR]: 'bumeran',
  [SiteIds.BMCL]: 'laborum',
  [SiteIds.BMEC]: 'multitrabajos',
  [SiteIds.BMMX]: 'bumeran',
  [SiteIds.BMPA]: 'konzerta',
  [SiteIds.BMPE]: 'bumeran',
  [SiteIds.BMVE]: 'bumeran',
  [SiteIds.ZJAR]: 'zonajobs',
}

// Si no se encuentra la variable Site Id se usara los estilos de bumeran como default
const portalEnv = portalsBySiteId[process.env.REACT_APP_SITE_ID] || portalsBySiteId.BMAR

// const ThemeLoger = () => {
//   const themeContext = useContext(ThemeContext)
//   console.log('Theme', themeContext)
//   return null
// }

if (!portalEnv) {
  console.warn(`REACT_APP_SITE_ID env variable MUST be defined and one of ${JSON.stringify(Object.values(SiteIds))}`)
}
// TODO: we could remove the other themes before building based on `portalEnv`

export const PortalTheme = ({ portal, children }) => {
  return (
    <ThemeProvider theme={themes[portal]}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  )
}

PortalTheme.propTypes = {
  portal: PropTypes.oneOf(Object.keys(themes)),
  children: PropTypes.node.isRequired,
}

PortalTheme.defaultProps = {
  portal: portalEnv,
}
