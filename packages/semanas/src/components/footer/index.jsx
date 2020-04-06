import React from 'react'
import { Footer } from '@navent-jobs/ui-kit'
import { SiteIds, IS_ZONA_JOBS, SITE_ID, ID_PAIS, NOMBRE_SITIO } from '../../constants'

class FooterSemanas extends React.Component {
  render() {
    return (
      <Footer
        isZonaJobs={IS_ZONA_JOBS}
        showDataFiscal={ID_PAIS === 1}
        showLinkPoliticaGestionCalidad={SITE_ID === SiteIds.BMAR}
        idPais={ID_PAIS}
        nombreSitio={NOMBRE_SITIO}
      />
    )
  }
}
export default FooterSemanas
