import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'

import { Searchbar, Dropdown, Link, Nav, NavItem, Navbar, Container, Row, Col } from '../../components'
import { MakeHeader } from './mixins'

const LoggedInMenuItems = [
  { href: '/noticias/', name: 'Blog' },
  { href: '/salarios/', name: 'Sueldos' },
  { href: '/candidatos/curriculum', name: 'Mi cv' },
  { href: '/candidatos/postulaciones', name: 'Mis Postulaciones' },
  {
    type: 'dropdown',
    items: [
      { href: '/candidatos/cuenta', name: 'Perfil' },
      { href: '/candidatos/cuenta?seccion=tab-notificaciones', name: 'Notificaciones' },
      { href: '/candidatos/cuenta?seccion=tab-alertas', name: 'Alertas' },
      { href: '/candidatos/cuenta?seccion=tab-privacidad', name: 'Privacidad' },
      { href: '/publico/mantenimiento', name: 'Tolki' },
      { href: '/logout', name: 'Cerrar Sesión' },
    ],
  },
]

const noLoggedInMenuItems = [
  { href: '/noticias/', name: 'Blog' },
  { href: '/salarios/', name: 'Sueldos' },
  { href: '/empresas', name: 'Soy Empresa' },
  {
    href: '/empresas/publicarGratis',
    name: 'Publicar gratis',
    width: '138px',
    props: {
      size: 'small',
      variant: 'primary',
      outline: true,
    },
  },
  {
    href: '/login',
    name: 'Ingresar',
    width: '138px',
    props: {
      size: 'small',
      variant: 'primary',
    },
  },
]

const HeaderComponent = styled.div`
  ${props => MakeHeader(props)}
`

const ItemNavbar = styled(NavItem)``

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.menuItems()
  }

  menuItems = () => {
    this.setState({
      // eslint-disable-next-line
      menuItems: this.props.applicant && this.props.applicant.fotoURL ? LoggedInMenuItems : noLoggedInMenuItems,
    })
  }

  // eslint-disable-next-line react/destructuring-assignment
  getMenuItems = () => (this.props.isLoged ? LoggedInMenuItems : noLoggedInMenuItems)

  render() {
    // eslint-disable-next-line react/prop-types1
    const { applicant } = this.props
    const menuItems = this.getMenuItems()
    return (
      <HeaderComponent>
        <Container>
          <Row>
            <Col sm={12}>
              <Navbar
                contentPosition="justify"
                logo={{
                  src: 'https://imgbum.jobscdn.com/postulantes-assets/skins/bumeran/commons/img/logo.svg',
                  // src: '../../assets/img/logo_bumeran.svg',
                  width: '123',
                  height: 'auto',
                  alt: 'Logo',
                  class: 'logo',
                }}
              >
                <Searchbar {...this.props} />

                <Nav>
                  {menuItems.map(item => {
                    const { props } = item

                    return item.type === 'dropdown' ? (
                      <Dropdown variant="toggle-with-image" items={item.items}>
                        <img className="avatar-user" alt="User Avatar" src={`${applicant.fotoURL}`} />
                      </Dropdown>
                    ) : (
                      <ItemNavbar>
                        <Link {...props} key={item.name} href={item.href} width={item.width}>
                          {item.name}
                        </Link>
                      </ItemNavbar>
                    )
                  })}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </HeaderComponent>
    )
  }
}

const mapStateToProps = ({ applicantStore }) => {
  return {
    isLoged: !!applicantStore.applicant,
    applicant: applicantStore.applicant,
  }
}

const HeaderWithStore = connect(mapStateToProps)(Header)
export { HeaderWithStore as Header }

Header.propTypes = {
  isLoged: PropTypes.bool,
  applicant: PropTypes.shape({
    fotoURL: PropTypes.string,
  }).isRequired,
}

Header.defaultProps = {
  isLoged: false,
}
