/**
 * Dependencies
 */
import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, Container, Row } from '@navent-jobs/ui-kit'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const CustomContainer = styled(Container)`
  border: 1px solid tomato;
`
// eslint-disable-next-line react/prefer-stateless-function
export const Home = () => {
  const [lugar, setLugar] = useState('')
  const [puesto, setPuesto] = useState('')
  const handleChange = (e, seter) => seter(e.target.value)

  return (
    <HomeUI
      puesto={puesto}
      lugar={lugar}
      puestoHandleChange={e => handleChange(e, setPuesto)}
      lugarHandleChange={e => handleChange(e, setLugar)}
    />
  )
}

const HomeUI = ({ puesto, puestoHandleChange, lugarHandleChange }) => {
  return (
    <>
      <CustomContainer>
        <Row>
          <input type="text" placeholder="Puesto" onChange={puestoHandleChange} />
          <input type="text" placeholder="Lugar" onChange={lugarHandleChange} />
          <Link to={{ pathname: `/empleos-busqueda-${puesto}.html` }}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Link>
        </Row>
      </CustomContainer>
      <Container>
        <NavLink to={{ pathname: '/login', exact: true }}>Go to Login Page</NavLink>
      </Container>
    </>
  )
}

HomeUI.propTypes = {
  puesto: PropTypes.string.isRequired,
  puestoHandleChange: PropTypes.func,
  lugarHandleChange: PropTypes.func,
}

HomeUI.defaultProps = {
  puestoHandleChange: null,
  lugarHandleChange: null,
}
