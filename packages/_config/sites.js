import { Countries } from './countries'

// Está armado así para que pueda importarse la constante y verificar que exista
export const SiteIds = Object.freeze({
  BMAR: 'BMAR',
  BMEC: 'BMEC',
  BMPE: 'BMPE',
  BMVE: 'BMVE',
  BMMX: 'BMMX',
  BMPA: 'BMPA',
  BMCL: 'BMCL',
  ZJAR: 'ZJAR',
})

export const SiteConfig = Object.freeze({
  [SiteIds.BMAR]: {
    nombre: 'Bumeran',
    pais: Countries.AR,
  },
  [SiteIds.BMCL]: {
    nombre: 'Laborum',
    pais: Countries.CL,
  },
  [SiteIds.BMEC]: {
    nombre: 'Multitrabajos',
    pais: Countries.EC,
  },
  [SiteIds.BMMX]: {
    nombre: 'Bumeran',
    pais: Countries.MX,
  },
  [SiteIds.BMPA]: {
    nombre: 'Konzerta',
    pais: Countries.PA,
  },
  [SiteIds.BMPE]: {
    nombre: 'Bumeran',
    pais: Countries.PE,
  },
  [SiteIds.BMVE]: {
    nombre: 'Bumeran',
    pais: Countries.VE,
  },
  [SiteIds.ZJAR]: {
    nombre: 'ZonaJobs',
    pais: Countries.AR,
  },
})
