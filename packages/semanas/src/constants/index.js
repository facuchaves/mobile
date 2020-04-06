import { SiteConfig, SiteIds } from '@navent-jobs/config'
import { sitesGTMCodes } from './gtmcodes'

const { REACT_APP_SITE_ID: SITE_ID } = process.env

if (!SITE_ID) {
  throw new Error('You must provide an env variable for REACT_APP_SITE_ID')
}

const GTM_ID = sitesGTMCodes[SITE_ID] && sitesGTMCodes[SITE_ID].GTM
if (!GTM_ID) Error(`No GMT for site "${SITE_ID}"`)

const GTM_TID = sitesGTMCodes[SITE_ID] && sitesGTMCodes[SITE_ID].UA
if (!GTM_TID) Error(`No Tracking code for site "${SITE_ID}"`)

const siteConfig = SiteConfig[SITE_ID]

// **Constantes** que se deducen de SITE_ID al hacer build
const IS_ZONA_JOBS = SITE_ID === SiteIds.ZJAR
const NOMBRE_SITIO = siteConfig.nombre
const ID_PAIS = siteConfig.pais.id
const NOMBRE_PAIS = siteConfig.pais.nombre

export { SiteIds, SITE_ID, NOMBRE_SITIO, IS_ZONA_JOBS, ID_PAIS, NOMBRE_PAIS, GTM_ID, GTM_TID }
