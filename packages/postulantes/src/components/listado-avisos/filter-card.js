// eslint-disable-next-line no-unused-vars
import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

const Ul = styled.ul`
  padding: 2px 16px;
  display: block;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 5px 5px;
`
const Li = styled.li`
  color: ${props => props.theme.colors.primary.lighten};
  padding: 6px 8px;
  list-style-type: none;
  display: block;
  text-align: left;
  :hover {
    cursor: pointer;
    color: ${props => props.theme.colors.primary.darken};
  }
`

export const FilterCard = ({ filter }) => {
  return (
    <Ul key={filter.type}>
      {filter.type.toUpperCase().replace(/_/g, ' ')}
      {filter.facets.map(facet => (
        <Li key={facet.id}>{facet.name}</Li>
      ))}
    </Ul>
  )
}

FilterCard.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string,
    facets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
      })
    ),
  }).isRequired,
}
FilterCard.defaultProps = {}
