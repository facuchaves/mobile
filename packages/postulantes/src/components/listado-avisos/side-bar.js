import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

import { FilterCard } from './filter-card'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

const Sidebar = styled.nav`
  padding: 10px;
`

export const ListaSidebar = ({ filters, loading }) => {
  if (loading) return <>Loading...</>
  return (
    <Wrapper>
      <Sidebar>
        {filters.map(filter => (
          <FilterCard key={filter.type} filter={filter} />
        ))}
      </Sidebar>
    </Wrapper>
  )
}

ListaSidebar.propTypes = {
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
  loading: PropTypes.bool.isRequired,
}

ListaSidebar.defaultProps = {
  filters: [],
}
