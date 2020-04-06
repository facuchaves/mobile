/**
 * Dependencies
 */
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'
import { Container, Row, Col } from '@navent-jobs/ui-kit'
// import { ListaSidebar } from './side-bar'
import { ListadoAvisosPrincipal } from './listado-avisos-principal'

const CustomContainer = styled(Container)`
  #border: 1px solid tomato;
`

export const ListaAvisosUI = ({ listado, loading, onClick }) => {
  const {
    // filters,
    content: avisos,
  } = listado

  return (
    <>
      <CustomContainer>
        <Row>
          {/* <Col lg={3}>
            <ListaSidebar filters={filters} loading={loading} />
          </Col> */}
          <Col>
            <ListadoAvisosPrincipal avisos={avisos} loading={loading} onClick={onClick} />
          </Col>
        </Row>
      </CustomContainer>
    </>
  )
}

ListaAvisosUI.propTypes = {
  listado: PropTypes.shape({
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        facets: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            quantity: PropTypes.number,
          })
        ),
      })
    ),
    content: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        titulo: PropTypes.string,
        logoURL: PropTypes.string,
        empresa: PropTypes.string,
        localizacion: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

ListaAvisosUI.defaultProps = {
  listado: {
    filters: [],
    content: [],
  },
}
