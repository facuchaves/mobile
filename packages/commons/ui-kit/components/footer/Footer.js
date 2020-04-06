/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container, Row, Col } from '../grid/Grid'
import DropdownCountries from '../dropdown-countries/Dropdown-countries'
import naventImg from './images/logo-nav.png'
import { FooterContainer, Ul, Li, A, H4, CopyrightFooter, LogoNavent, DataFiscal } from './mixins'

const Span = styled.span`
  width: 120px;
  display: block;
  font-size: 14px;
  line-height: 20px;
  color: #7c7c7c;

  @media (min-width: 576px) {
    width: 100%;
    line-height: 15px;
    font-size: 12px;
  }
`

export class Footer extends React.Component {
  render() {
    const { isZonaJobs, showDataFiscal, showLinkPoliticaGestionCalidad, idPais, nombreSitio } = this.props

    const links = [
      { link: `/publico/terminos_y_condiciones`, label: 'Términos y Condiciones' },
      { link: `/publico/politica_de_privacidad`, label: 'Política de Privacidad' },
      { link: `/publico/condiciones_de_contratacion`, label: 'Condiciones de contratación' },
      { link: `/publico/proteccion_datos_personales`, label: 'Protección de Datos Personales' },
      { link: `http://naventmedia.com/`, label: `${nombreSitio} publicidad` },
      { link: `/noticias/`, label: 'Noticias' },
      { link: `/sitemaps/`, label: 'Ofertas de Empleo' },
    ]

    return (
      <FooterContainer>
        <Container>
          <Row>
            <Col xs={12} md={isZonaJobs ? 7 : 12}>
              <Ul>
                {links.map(({ link, label }, index) => (
                  <Li key={index}>
                    <A href={`${link}`}>
                      <H4>{label}</H4>
                    </A>
                  </Li>
                ))}

                {/*  Mostramos politicas de gestion de calidad cuando nos encontramos en bumeran Argentina. */}

                {showLinkPoliticaGestionCalidad && (
                  <Li>
                    <A href="/publico/politica_gestion_calidad/">
                      <h4>Política de Gestión de Calidad</h4>
                    </A>
                  </Li>
                )}
              </Ul>
            </Col>

            {isZonaJobs && (
              <Col xs={12} md={5} className="text-right">
                <CopyrightFooter>
                  <A href="http://www.navent.com">
                    <LogoNavent src={naventImg} alt="Navent" />
                  </A>
                  <Span>Copyright &reg; 1999-{new Date().getFullYear()} Navent</Span>
                </CopyrightFooter>

                <DataFiscal>
                  <A
                    href="https://servicios1.afip.gov.ar/clavefiscal/qr/response.aspx?qr=rCEAaA3hEEpqB4O13KuuOQ,,"
                    target="_F960AFIPInfo"
                  >
                    <img alt="Data fiscal" src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" border="0" />
                  </A>
                </DataFiscal>
              </Col>
            )}
          </Row>

          {!isZonaJobs && (
            <Row style={{ marginTop: '15px' }}>
              <Col xs={5}>
                <DropdownCountries idPais={idPais} />
              </Col>

              <Col xs={7} className="text-right">
                <CopyrightFooter>
                  <A href="http://www.navent.com">
                    <LogoNavent src={naventImg} alt="Navent" />
                  </A>
                  <Span>Copyright &reg; 1999-{new Date().getFullYear()} Navent</Span>
                </CopyrightFooter>
                {showDataFiscal && (
                  <DataFiscal>
                    <A
                      href="https://servicios1.afip.gov.ar/clavefiscal/qr/response.aspx?qr=Iv1YrfwD5YPQV6kMGMPaYQ,,"
                      target="_F960AFIPInfo"
                    >
                      <img alt="Data fiscal" src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" border="0" />
                    </A>
                  </DataFiscal>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </FooterContainer>
    )
  }
}

Footer.propTypes = {
  isZonaJobs: PropTypes.bool.isRequired,
  showDataFiscal: PropTypes.bool.isRequired,
  showLinkPoliticaGestionCalidad: PropTypes.bool.isRequired,
  idPais: PropTypes.number.isRequired,
  nombreSitio: PropTypes.string.isRequired,
}
