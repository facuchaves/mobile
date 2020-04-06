/**
 * Dependencies
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, ContainerFluid } from '@navent-jobs/ui-kit'
import { isEmpty } from 'lodash'
/**
 * Components
 */
import Slider from 'react-slick'
import MyLoaderCarrousel from '../empty-states/carrousel-empty'

/**
 * Assets
 */
import './slick.css'

const WrapperSlick = styled.div`
  margin-bottom: 20px;
`

const ContainerCarrousel = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
`
const LogosImg = styled.img`
  transform: none !important;
`

export default class CarrouselHome extends React.PureComponent {
  renderOnError() {
    return (
      <div className="main">
        <h1>Ocurrio un error consultando los avisos de la semana.</h1>
      </div>
    )
  }

  renderOnLoad() {
    return (
      <WrapperSlick className="wrapper-slick">
        <MyLoaderCarrousel />
      </WrapperSlick>
    )
  }

  renderOnSuccess() {
    const { logosUrls } = this.props

    const settings = {
      infinite: true,
      autoplay: true,
      speed: 2000,
      initialSlide: 3,
      slidesToShow: Math.min(logosUrls.length, 7),
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(logosUrls.length, 4),
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
      ],
    }

    return (
      <ContainerFluid>
        <Row>
          <Col>
            <ContainerCarrousel>
              <Slider {...settings}>
                {logosUrls.map(({ logo }) => (
                  <LogosImg alt="" key={`logo-${logo}`} src={logo} />
                ))}
              </Slider>
            </ContainerCarrousel>
          </Col>
        </Row>
      </ContainerFluid>
    )
  }

  render() {
    const { hasError, isLoading, logosUrls } = this.props

    if (hasError) {
      return this.renderOnError()
    }

    if (isLoading || isEmpty(logosUrls)) {
      return this.renderOnLoad()
    }

    return this.renderOnSuccess()
  }
}

CarrouselHome.propTypes = {
  logosUrls: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string,
    })
  ).isRequired,
  hasError: PropTypes.bool,
  isLoading: PropTypes.bool,
}

CarrouselHome.defaultProps = {
  hasError: false,
  isLoading: false,
}
