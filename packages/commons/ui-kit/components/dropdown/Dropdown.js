import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../button/Button'
import {
  MakeDropdownToggle,
  MakeDropdownBackdrop,
  MakeDropdownMain,
  MakeDropdownMenu,
  MakeDropdownItem,
  MakeDropdownDivider,
} from './mixins'
import { Link } from '../../components'

const DropdownBackdrop = styled.div`
  ${props => MakeDropdownBackdrop(props)}
`
const DropdownMain = styled.div`
  ${props => MakeDropdownMain(props)}
`
const DropdownMenu = styled.div`
  ${props => MakeDropdownMenu(props)}
`
const DropdownToggle = styled(Button)`
  ${props => MakeDropdownToggle(props)}
`
const DropdownItem = styled.a`
  ${props => MakeDropdownItem(props)}
`
const DropdownDivider = styled.div`
  ${props => MakeDropdownDivider(props)}
`

export const Dropdown = ({ items, variant, children, withArrow }) => {
  const [hidden, setHidden] = useState(true)

  const buttonOnClickHandler = () => {
    setHidden(!hidden)
  }

  const closeDropdown = () => {
    setHidden(true)
  }

  return (
    <DropdownMain>
      <DropdownToggle
        variant={variant}
        onClick={buttonOnClickHandler}
        className={`${withArrow ? 'with-arrow' : ''} ${!hidden ? 'dropdown-open' : ''}`}
      >
        {children}
      </DropdownToggle>

      <DropdownMenu hidden={hidden}>
        {items.map(item => (
          <>
            {item.divider ? <DropdownDivider /> : null}
            <Link href={item.href}>
              <DropdownItem key={item.name} href={item.href}>
                {item.name}
              </DropdownItem>
            </Link>
          </>
        ))}
      </DropdownMenu>

      <DropdownBackdrop hidden={hidden} onClick={closeDropdown} />
    </DropdownMain>
  )
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  withArrow: PropTypes.bool,
}

Dropdown.defaultProps = {
  variant: 'primary',
  withArrow: true,
}
