import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

const SectionTitle = styled.p`
  color: #585992;
  font-size: 16px;
`

const LinksContainer = styled.ul`
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  width: 50%;
  float: left;
  list-style: none;
`

const Link = styled.a`
  color: #585992;
  text-decoration: none !important;
`

const LinkTitle = styled.h3`
  font-size: 14px;
  color: #606060;
  font-weight: 400;
  line-height: 30px;
  &:hover {
    color: #fe633f;
  }
`

// const LinkBusqueda = styled.

export const BusquedasRelacionadas = ({ busquedas }) => {
  if (isEmpty(busquedas)) {
    return <h3>No hay búsquedas relacionadas</h3>
  }

  return (
    <div>
      <SectionTitle>Búsquedas Relacionadas</SectionTitle>

      <LinksContainer>
        {busquedas.map(({ titulo, link }) => (
          <Li key={`${titulo}_${link}`}>
            <Link href={link}>
              <LinkTitle>{titulo}</LinkTitle>
            </Link>
          </Li>
        ))}
      </LinksContainer>
    </div>
  )
}

export const BusquedaRelacionadaPropType = PropTypes.shape({
  titulo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
})

BusquedasRelacionadas.propTypes = {
  busquedas: PropTypes.arrayOf(BusquedaRelacionadaPropType),
}

BusquedasRelacionadas.defaultProps = {
  busquedas: [],
}
