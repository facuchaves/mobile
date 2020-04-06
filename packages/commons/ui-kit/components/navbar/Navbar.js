import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Link } from '../../components'
import { MakeNavbar, MakeBrand, MakeCollapse } from './mixins'

const NavbarComponent = styled.div`
  ${props => MakeNavbar(props)}
`

const Brand = styled.a`
  ${props => MakeBrand(props)}
`

// const Toggle = styled.button`
//   ${props => MakeToggle(props)}
// `

// const SearchToggle = styled.button`
//   ${props => MakeSearchToggle(props)}
// `

const Collapse = styled.div`
  ${props => MakeCollapse(props)}
`

const CONTENT_ALIGN = {
  left: 'content-left',
  right: 'content-right',
  center: 'content-center',
  justify: 'space-between',
}

export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchBarOpened: false,
    }
  }

  openSearchBar = () => {
    const { searchBarOpened } = this.state
    this.setState({
      searchBarOpened: !searchBarOpened,
    })
  }

  render() {
    const { children, contentPosition, logo } = this.props
    // const { searchBarOpened } = this.state
    return (
      <NavbarComponent>
        <Link href="/">
          <Brand>
            <img
              src={`${logo.src}`}
              width={`${logo.width}`}
              height={`${logo.height}`}
              alt={`${logo.alt}`}
              className={`${logo.class}`}
            />
          </Brand>
        </Link>
        {/* <SearchToggle onClick={this.openSearchBar}>{searchBarOpened ? 'Close Search' : 'Open Search'}</SearchToggle>
        <Toggle>+</Toggle> */}
        <Collapse className={CONTENT_ALIGN[contentPosition]}>{children && children}</Collapse>
      </NavbarComponent>
    )
  }
}

Navbar.propTypes = {
  contentPosition: PropTypes.string,
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  logo: PropTypes.object.isRequired,
}

Navbar.defaultProps = {
  contentPosition: 'left',
}
