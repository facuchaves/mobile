import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import moment from 'moment'
import styled from 'styled-components'
import { Row, Col } from '@navent-jobs/ui-kit'

const Header = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`

const Box = styled.div`
  padding: 5px 15px 15px;
  border: 1px solid rgba(112, 117, 193, 0.2);
  border-radius: 3px;
  box-shadow: none;
  cursor: pointer;

  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
`

const BoxHeader = styled.div`
  border-bottom: solid 1px rgba(186, 187, 202, 0.5);
  text-align: right;
  font-size: 12px;
  margin-bottom: 10px;
`

const JobTitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.primary.darken};
`

const CompanyTitle = styled.div`
  color: #5a595a;
  font-size: 12px;
  font-weight: 600;
`

const CompanyImage = styled.img`
  height: 40px;
`

export const EmpleosRelacionados = ({ empleos, onClick }) => {
  if (isEmpty(empleos)) {
    return <h3>No hay empleos relacionados</h3>
  }

  return (
    <>
      <Header>Empleos Relacionados</Header>
      {empleos.map(empleo => {
        const { fechaPublicacion, titulo, empresa, link, logoURL: imagen } = empleo

        return (
          <Box key={`${titulo}_${empresa}`} onClick={() => onClick(empleo)}>
            <BoxHeader>
              <div>HACE {moment().diff(moment(fechaPublicacion, 'DD-MM-YYYY HH:mm:ss'), 'days') + 1} DIAS</div>
            </BoxHeader>

            <Row>
              <Col>
                <JobTitle href={link}>{titulo}</JobTitle>
                <CompanyTitle>{empresa}</CompanyTitle>
              </Col>

              {imagen && <CompanyImage src={imagen} alt={empresa} />}
            </Row>
          </Box>
        )
      })}
    </>
  )
}

export const EmpleoRelacionadoPropType = PropTypes.shape({
  fechaPublicacion: PropTypes.string.isRequired, // PropTypes.instanceOf(Date),
  titulo: PropTypes.string.isRequired,
  empresa: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imagen: PropTypes.string,
})

EmpleosRelacionados.propTypes = {
  empleos: PropTypes.arrayOf(EmpleoRelacionadoPropType),
  onClick: PropTypes.func.isRequired,
}

EmpleosRelacionados.defaultProps = {
  empleos: [],
}
