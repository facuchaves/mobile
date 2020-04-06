import React from 'react'
import PropTypes from 'prop-types'

import { Card } from '@navent-jobs/ui-kit'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoEmptyImage = require('../../assets/images/sin-logo.jpg')

export const ListadoAvisosPrincipal = ({ avisos, loading, onClick }) => {
  if (loading) return <>Loading...</>
  return avisos.map(avisosRow => {
    const avisoProp = {
      id: avisosRow.id,
      titulo: avisosRow.titulo,
      logo: avisosRow.logoURL,
      nombreEmpresa: avisosRow.empresa,
      ubicacion: avisosRow.localizacion,
      diasPublicacion: 1,
    }
    // return <Card key={avisoProp.id} logoEmpty={logoEmptyImage} aviso={avisoProp} link={`/empleos/${avisoProp.id}`} />
    return <Card key={avisoProp.id} logoEmpty={logoEmptyImage} aviso={avisoProp} disableLink onClick={onClick} />
  })
}

ListadoAvisosPrincipal.propTypes = {
  avisos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      titulo: PropTypes.string,
      logoURL: PropTypes.string,
      empresa: PropTypes.string,
      localizacion: PropTypes.string,
    })
  ),
}

ListadoAvisosPrincipal.defaultProps = {
  avisos: [],
}
