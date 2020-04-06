import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb,
  BreadcrumbLinkPropType,
  Button,
  Modal,
  Row,
  Col,
  Container,
  Card,
  ContainerFluid,
} from '@navent-jobs/ui-kit'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AvisoPropType, FichaAvisoWithId } from '../../components/ficha-aviso'
import {
  BusquedasRelacionadas,
  BusquedaRelacionadaPropType,
} from '../../components/pages-ui/ficha-aviso/busquedas-relacionadas'
import {
  EmpleosRelacionados,
  EmpleoRelacionadoPropType,
} from '../../components/pages-ui/ficha-aviso/empleos-relacionados'
import { SocialSharingBox } from '../../components/pages-ui/ficha-aviso/social-sharing'
import { FormDenunciar } from '../../components/pages-ui/ficha-aviso/form-denunciar-aviso'

const EmptyCol = styled(Col)`
  display: none;

  @media (min-width: 576px) {
    visibility: hidden;
  }
`

const ButtonWithMargin = styled(Button)`
  margin: 10px;
`

const logoEmptyImage = undefined // require('../../../assets/images/sin-logo.jpg')
const avisoFinalizadoImage = undefined // require('../../../assets/images/out-of-time.png')

export const PageUI = ({
  idAviso: id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading,
  aviso,
  busquedasRelacionadas,
  empleosRelacionados,
  onEmpleoClick,
  onDenunciarClick,
  breadcrumbLinks,
  onBreadcrumbBackLinkClick,
  visibleModal,
  showModal,
  hideModal,
  avisosRelacionados,
  subAreaUrl,
  afterLoadingFicha,
}) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            {breadcrumbLinks && (
              <Breadcrumb
                onBackLinkClick={onBreadcrumbBackLinkClick}
                links={breadcrumbLinks}
                currentTitle={aviso.titulo}
              />
            )}

            {onDenunciarClick && (
              <Button variant="secondary" onClick={() => showModal('modal-denunciar')}>
                Denunciar
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <FichaAvisoWithId id={id} afterLoadingFicha={afterLoadingFicha} />
            <BusquedasRelacionadas busquedas={busquedasRelacionadas} />
          </Col>

          <Col md={4}>
            <EmpleosRelacionados empleos={empleosRelacionados} onClick={onEmpleoClick} />
          </Col>
        </Row>
      </Container>

      {/* MODAL DENUNCIAR */}
      <Modal
        animation="fadeIn"
        visible={visibleModal === 'modal-denunciar'}
        onClose={hideModal}
        header={<h3>¿Por qué estás denunciando?</h3>}
      >
        <FormDenunciar aviso={aviso} onClose={hideModal} />
      </Modal>

      {avisosRelacionados && (
        <Modal
          animation="fadeIn"
          visible={visibleModal === 'modal-avisos-relacionados'}
          onClose={hideModal}
          header={
            <div>
              <img alt="avisoFinalizadoImage" src={avisoFinalizadoImage} />
              <h3>Este aviso finalizó</h3>
              <p>Pero, no te preocupes, mirá todos los avisos similares que tenemos para vos.</p>
            </div>
          }
        >
          <ContainerFluid>
            {avisosRelacionados.map(avisoRecomendado => (
              <Row key={`card-${avisoRecomendado.id}`}>
                {avisoRecomendado === undefined ? (
                  <EmptyCol md={6} key={false} />
                ) : (
                  <Col key={avisoRecomendado.titulo}>
                    <Card logoEmpty={logoEmptyImage} skin="CARD_WITHOUT_IMG" aviso={avisoRecomendado} />
                  </Col>
                )}
              </Row>
            ))}
          </ContainerFluid>
          <Row>
            <Col>
              <Link to={`/empleos-subarea-${subAreaUrl}.html`}>
                <ButtonWithMargin variant="primary" block>
                  Ver más avisos
                </ButtonWithMargin>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/">
                <ButtonWithMargin variant="secondary" block>
                  Ir al inicio
                </ButtonWithMargin>
              </Link>
            </Col>
          </Row>
        </Modal>
      )}
      <SocialSharingBox />
    </>
  )
}

PageUI.propTypes = {
  idAviso: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  aviso: AvisoPropType,
  busquedasRelacionadas: PropTypes.arrayOf(BusquedaRelacionadaPropType),
  empleosRelacionados: PropTypes.arrayOf(EmpleoRelacionadoPropType),
  breadcrumbLinks: PropTypes.arrayOf(BreadcrumbLinkPropType),
  onEmpleoClick: PropTypes.func.isRequired,
  onDenunciarClick: PropTypes.func,
  onBreadcrumbBackLinkClick: PropTypes.func,
  visibleModal: PropTypes.string,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  avisosRelacionados: PropTypes.object,
  subAreaUrl: PropTypes.string,
  postulacion: PropTypes.shape({
    fecha: PropTypes.string,
    estado: PropTypes.string,
  }),
  afterLoadingFicha: PropTypes.func,
}

PageUI.defaultProps = {
  loading: false,
  aviso: null,
  busquedasRelacionadas: [],
  empleosRelacionados: [],
  breadcrumbLinks: null,
  onBreadcrumbBackLinkClick: null,
  showModal: null,
  hideModal: null,
  onDenunciarClick: null,
  visibleModal: '',
  avisosRelacionados: null,
  subAreaUrl: null,
  postulacion: { fecha: null, estado: null },
  afterLoadingFicha: null,
}
