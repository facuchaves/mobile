import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { isEmpty, capitalize, lowerCase, trim } from 'lodash'
import { Row, Col } from '@navent-jobs/ui-kit'

import { PostulanteBar } from './postulante-bar'

const Container = styled.div`
  position: relative;
  padding: 1px;
  background: linear-gradient(
    64deg,
    ${props => props.theme.colors.primary.darken},
    ${props => props.theme.colors.primary.lighten}
  );
  border-radius: 3px;
`

// Header

const Header = styled.div`
  width: 100%;
  background-color: transparent;
  margin: 0 !important;
  padding: 10px 20px 25px;
`

const PositionTitle = styled.h1`
  max-width: calc(100% - 165px);
  color: white;
  font-size: 20px;
`

const CompanyLink = styled.a`
  max-width: calc(100% - 165px);
  color: white !important;
  text-decoration: none !important;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
`

const CompanyLogoContainer = styled.div`
  right: 15px;
  top: 25px;
  border: 1px solid #fe633f;
  width: 160px;
  height: 107px;
  position: absolute;
  padding: 5px 5px 1px;
  border-radius: 3px;
  background-color: #fff;
  text-align: center;
`

const CompanyLogo = styled.img`
  width: 100%;
  height: 95px;
`

// Content

const Content = styled.div`
  border-radius: 3px;
  padding: 20px;
  padding-bottom: 10px;
  background-color: white;
`

// Info

const InfoContainer = styled.div`
  width: 100%;
  max-width: 250px;
  display: inline-block;
  vertical-align: top;
  padding-bottom: 15px;
`

const Label = styled.div`
  font-size: 10px;
  color: #8c8c8c;
  font-weight: 400;
  text-transform: uppercase;
`

const Value = styled.div`
  font-size: 12px;
  color: #000000;
  font-weight: 400;
`

// eslint-disable-next-line react/prop-types
const Info = ({ label, value }) => (
  <InfoContainer>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </InfoContainer>
)

// Description

const Separator = styled.hr`
  margin: 15px 0;
`

// Video

const VideoContainer = styled.div`
  margin: -3px -15px 0;
  padding: 15px;
  border-radius: 0 0 3px 3px;
`

const VideoTitle = styled.div`
  font-size: 18px;
  color: #8c8c8c;
  font-weight: 300;
  margin-bottom: 10px;
`

const Video = styled.iframe`
  width: 100%;
  border: none;
`

const formatSalario = salario => {
  if (!salario || isEmpty(salario.tipo)) {
    return 'No especificado'
  }

  const { salarioMinimo, salarioMaximo, frecuenciaPago, tipo } = salario

  const rango = salarioMinimo > 0 ? `De $${salarioMinimo} a $${salarioMaximo}` : ''
  const tipoSalario = ` ${lowerCase(tipo)}`
  const frecuencia = frecuenciaPago ? ` ${lowerCase(frecuenciaPago.nombre)}` : ''

  return capitalize(trim(`${rango}${tipoSalario}${frecuencia}`))
}

export const FichaAviso = ({
  id,
  titulo,
  empresa,
  fechaPublicacion,
  localizacion,
  area,
  descripcion,
  tipoTrabajo,
  requisitos,
  videoUrl,
  postulacion,
  preguntas,
}) => {
  const textoFechaPublicacion = capitalize(moment(fechaPublicacion, 'DD/MM/AAAA').fromNow())
  const imagenEmpresa = empresa && empresa.logoURL ? empresa.logoURL.replace('prepro.', '') : null

  return (
    <Container>
      <Header>
        <Row>
          <Col>
            <PositionTitle>{titulo}</PositionTitle>
            <CompanyLink href={`TODO: ${empresa.link}`}>{empresa.denominacion}</CompanyLink>
          </Col>
          {imagenEmpresa && (
            <CompanyLogoContainer>
              <CompanyLogo src={imagenEmpresa} alt={empresa.denominacion} />
            </CompanyLogoContainer>
          )}
        </Row>
      </Header>

      <Content>
        {localizacion && <Info label="Lugar de trabajo" value={localizacion.detalle} />}
        {fechaPublicacion && <Info label="Publicado" value={textoFechaPublicacion} />}
        {requisitos && <Info label="Salario" value={formatSalario(requisitos.salario)} />}
        {tipoTrabajo && <Info label="Tipo de puesto" value={tipoTrabajo.nombre} />}
        {area && <Info label="Área" value={area.nombre} />}

        <Separator />

        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: descripcion }} />

        {videoUrl && (
          <VideoContainer>
            <VideoTitle>Video institucional</VideoTitle>
            <Video width="560" height="315" src={videoUrl} frameborder="0" allowfullscreen="" />
          </VideoContainer>
        )}

        <PostulanteBar id={id} postulacion={postulacion} preguntas={preguntas} requisitos={requisitos} />
      </Content>
    </Container>
  )
}

const EmpresaPropType = PropTypes.shape({
  denominacion: PropTypes.string.isRequired,
  logoURL: PropTypes.string,
  confidencial: PropTypes.bool,
  id: PropTypes.number,
})

const LocalizacionPropType = PropTypes.shape({
  direccion: PropTypes.string,
  detalle: PropTypes.string,
})

const AreaPropType = PropTypes.shape({
  nombre: PropTypes.string,
  detalle: PropTypes.string,
})

const TipoTrabajoPropType = PropTypes.shape({
  nombre: PropTypes.string,
})

const RequisitosPropType = PropTypes.shape({
  salario: PropTypes.shape({
    excluyente: PropTypes.bool,
    salarioMinimo: PropTypes.number,
    salarioMaximo: PropTypes.number,
    frecuenciaPago: PropTypes.shape({
      nombre: PropTypes.string,
    }),
    tipo: PropTypes.string,
    solicitarCandidato: PropTypes.bool,
  }),
})

export const AvisoPropType = PropTypes.shape({
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  empresa: EmpresaPropType.isRequired,
  localizacion: LocalizacionPropType,
  area: AreaPropType,
  tipoTrabajo: TipoTrabajoPropType,
})

FichaAviso.propTypes = {
  id: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  empresa: EmpresaPropType.isRequired,
  fechaPublicacion: PropTypes.string,
  descripcion: PropTypes.string.isRequired,
  localizacion: LocalizacionPropType,
  area: AreaPropType,
  tipoTrabajo: TipoTrabajoPropType,
  requisitos: RequisitosPropType,
  videoUrl: PropTypes.string,
  postulacion: PropTypes.shape({
    fecha: PropTypes.string,
    estado: PropTypes.string,
  }),
  preguntas: PropTypes.arrayOf(PropTypes.object),
}

FichaAviso.defaultProps = {
  fechaPublicacion: null,
  localizacion: null,
  area: null,
  tipoTrabajo: null,
  requisitos: null,
  videoUrl: null,
  postulacion: { fecha: null, estado: null },
  preguntas: null,
}
