import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Nav, NavItem } from '..'

import { makeTabContainer, makeTabLink, makeTabContent } from './mixins'

export const TabsContainer = styled.div`
  ${props => makeTabContainer(props)}
`

export const Tab = styled.div``

export const TabLink = styled.a`
  ${props => makeTabLink(props)}
`

export const TabContent = styled.div`
  ${props => makeTabContent(props)}
`

export const Tabs = props => {
  const [activeTab, setActiveTab] = useState(0)
  const { children } = props
  return (
    <TabsContainer>
      <Nav className="nav-links">
        {children.map((item, index) => (
          <NavItem
            className="nav-item"
            onClick={() => {
              setActiveTab(index)
            }}
          >
            <TabLink isActive={activeTab === index}>{item.props.title}</TabLink>
          </NavItem>
        ))}
      </Nav>

      <Tab>
        <TabContent>{children[activeTab].props.children}</TabContent>
      </Tab>
    </TabsContainer>
  )
}

Tabs.propTypes = {
  children: PropTypes.string.isRequired,
}
