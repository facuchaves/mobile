import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { ContainerFluid, Row, Col } from '@navent-jobs/ui-kit'
import { HeaderPage, LogoPage } from './styles'

/* eslint-disable global-require */
// TODO: los assets deberían tomarse al momento de build (no haría falta este mapa)
// La url debería ser siempre `assets/images/logo.png` o similar
const logos = {
  bumeran: require('../../assets/images/logoSemanas-bumeran.png'),
  laborum: require('../../assets/images/logoSemanas-laborum.png'),
  konzerta: require('../../assets/images/logoSemanas-konzerta.png'),
  multitrabajos: require('../../assets/images/logoSemanas-multitrabajos.png'),
}
/* eslint-enable global-require */

class Header extends React.PureComponent {
  render() {
    const {
      theme: { portal },
    } = this.props

    return (
      <HeaderPage>
        <ContainerFluid>
          <Row>
            <Col>
              <LogoPage src={logos[portal]} alt={`${portal}-logo`} />
            </Col>
          </Row>
        </ContainerFluid>
      </HeaderPage>
    )
  }
}

Header.propTypes = {
  theme: PropTypes.shape({
    portal: PropTypes.string,
  }).isRequired,
}

export default withTheme(Header)
