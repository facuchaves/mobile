/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chunk, isEmpty, times } from 'lodash'
import { Container, Row, Col, Card } from '@navent-jobs/ui-kit'

const errorImageUrl = 'https://careers.avanade.com/jscore/images/http/fatal.png'

const ListContainer = styled(Container)`
  @media (min-width: 992px) {
    max-width: 820px;
  }
`

const EmptyCol = styled(Col)`
  display: none;

  @media (min-width: 576px) {
    visibility: hidden;
  }
`
const logoEmptyImage = require('../../assets/images/sin-logo.jpg')

export default class ListadoAvisos extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
    }
  }

  renderOnError() {
    return (
      <>
        <img src={errorImageUrl} alt="error" />
        <h1>Ocurrio un error consultando los avisos de la semana.</h1>
      </>
    )
  }

  renderPlaceholder = () => {
    return times(12, index => (
      <Row key={`card-placeholder-${index}`}>
        <Col md={6}>
          <Card isLoading />
        </Col>
        <Col md={6}>
          <Card isLoading />
        </Col>
      </Row>
    ))
  }

  renderAvisos = () => {
    const { avisos } = this.props
    const avisosRows = chunk(avisos, 2)
    const { errors } = this.state

    return avisosRows.map((avisosRow, index) => (
      <Row key={`card-${index}`}>
        {avisosRow.map(aviso =>
          aviso === undefined ? (
            <EmptyCol md={6} key={false} />
          ) : (
            <Col md={6} key={aviso.titulo}>
              <Card logoEmpty={logoEmptyImage} aviso={aviso} hasError={errors[aviso.titulo]} />
            </Col>
          )
        )}
      </Row>
    ))
  }

  renderOnSuccess = () => {
    const { avisos } = this.props

    return <ListContainer>{isEmpty(avisos) ? this.renderPlaceholder() : this.renderAvisos()}</ListContainer>
  }

  render() {
    const { hasError } = this.props

    if (hasError) {
      return this.renderOnError()
    }

    return this.renderOnSuccess()
  }
}

ListadoAvisos.propTypes = {
  hasError: PropTypes.bool,
  avisos: PropTypes.arrayOf(
    PropTypes.shape({
      titulo: PropTypes.string.isRequired,
    })
  ).isRequired,
}

ListadoAvisos.defaultProps = {
  hasError: false,
}
