import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ClampLines from 'react-clamp-lines'
import { isEmpty } from 'lodash'
import CardPlaceholder from './CardPlaceholder'

import {
  makeSimpleCard,
  makeSimpleCardLogo,
  makeSimpleCardDescription,
  makeSimpleCardTitle,
  makeSimpleCardCompany,
  makeSimpleCardLocation,
  makeSimpleCardDate,
  makeSimpleCardWithoutImg,
  makeSimpleCardDescriptionWithoutImg,
  makeSimpleCardDateWithoutImg,
  makeSimpleCardTitleWithoutImg,
} from './mixins'

const SKINS = {
  CARD_WITHOUT_IMG: 'CARD_WITHOUT_IMG',
}
const CardWithoutImg = props => {
  const { link, aviso, disableLink } = props
  const { id, titulo, nombreEmpresa, ubicacion, tiempoDesdePostulacion } = aviso
  const refTo = disableLink ? undefined : link || `/empleos/${id}.html`
  return (
    <CardComponentWithoutImg href={refTo} target="_blank">
      <CardDescriptionWithoutImg>
        <CardTitleWithoutImg text={titulo} lines={2} buttons={false} />
        <CardCompany>{nombreEmpresa}</CardCompany>
        <CardLocation>
          {ubicacion}
          <CardDateWithoutImg>{tiempoDesdePostulacion}</CardDateWithoutImg>
        </CardLocation>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.264 20L0 17.6425L7.4712 9.99667L0 2.3575L2.264 0L12 9.99667L2.264 20Z"
            fill="#24282C"
            fillOpacity="0.28"
          />
        </svg>
      </CardDescriptionWithoutImg>
    </CardComponentWithoutImg>
  )
}
const CardSemanas = props => {
  const { logoEmpty, link, aviso, disableLink } = props
  const { id, titulo, logo, nombreEmpresa, ubicacion, diasPublicacion } = aviso
  const refTo = disableLink ? undefined : link || `/empleos/${id}.html`
  return (
    <CardComponent href={refTo} target="_blank">
      <CardLogo src={!isEmpty(logo) ? logo : logoEmpty} alt={`${nombreEmpresa} logo`} />
      <CardDescription>
        <CardTitle text={titulo} lines={2} buttons={false} />
        <CardCompany>{nombreEmpresa}</CardCompany>
        <CardLocation>
          {ubicacion}
          <CardDate>{diasPublicacion}</CardDate>
        </CardLocation>
      </CardDescription>
    </CardComponent>
  )
}

const CardComponent = styled.a`
  ${props => makeSimpleCard(props)}
`

const CardComponentWithoutImg = styled(CardComponent)`
  ${props => makeSimpleCardWithoutImg(props)}
`

const CardLogo = styled.img`
  ${props => makeSimpleCardLogo(props)}
`

const CardTitle = styled(ClampLines)`
  ${props => makeSimpleCardTitle(props)}
`

const CardTitleWithoutImg = styled(CardTitle)`
  ${props => makeSimpleCardTitleWithoutImg(props)}
`

const CardCompany = styled.h3`
  ${props => makeSimpleCardCompany(props)}
`

const CardDescription = styled.div`
  ${props => makeSimpleCardDescription(props)}
`

const CardDescriptionWithoutImg = styled(CardDescription)`
  ${props => makeSimpleCardDescriptionWithoutImg(props)}
`

const CardLocation = styled.h3`
  ${props => makeSimpleCardLocation(props)}
`

const CardDate = styled.span`
  ${props => makeSimpleCardDate(props)}
`

const CardDateWithoutImg = styled.span`
  ${props => makeSimpleCardDateWithoutImg(props)}
`

export class Card extends React.Component {
  renderOnLoad() {
    return <CardPlaceholder />
  }

  renderOnError() {
    return (
      <div className="main">
        <h1>Ocurrio un error consultando la semana.</h1>
      </div>
    )
  }

  renderOnSuccess() {
    const { skin, onClick, aviso } = this.props
    const cardComponent =
      skin === SKINS.CARD_WITHOUT_IMG ? <CardWithoutImg {...this.props} /> : <CardSemanas {...this.props} />
    if (!onClick) return cardComponent
    return (
      <div tabIndex={0} role="button" onKeyDown={null} onClick={() => onClick(aviso ? aviso.id : null)}>
        {cardComponent}
      </div>
    )
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { hasError, isLoading } = this.props

    if (hasError) {
      return this.renderOnError()
    }

    if (isLoading) {
      return this.renderOnLoad()
    }

    return this.renderOnSuccess()
  }
}

Card.propTypes = {
  id: PropTypes.string,
  aviso: PropTypes.isRequired,
  titulo: PropTypes.string,
  nombreEmpresa: PropTypes.string,
  ubicacion: PropTypes.string,
  diasPublicacion: PropTypes.string,
  logo: PropTypes.string,
  logoEmpty: PropTypes.string,
  link: PropTypes.string,
  skin: PropTypes.string,
  disableLink: PropTypes.bool,
  onClick: PropTypes.func,
}

Card.defaultProps = {
  id: '',
  titulo: '',
  nombreEmpresa: '',
  ubicacion: '',
  diasPublicacion: '',
  logo: '',
  logoEmpty: '',
  link: null,
  skin: '',
  disableLink: false,
  onClick: null,
}

CardWithoutImg.propTypes = {
  link: PropTypes.string,
  aviso: PropTypes.isRequired,
  disableLink: PropTypes.bool.isRequired,
}

CardWithoutImg.defaultProps = {
  link: null,
}

CardSemanas.propTypes = {
  logoEmpty: PropTypes.string,
  link: PropTypes.string,
  aviso: PropTypes.isRequired,
  disableLink: PropTypes.bool.isRequired,
}

CardSemanas.defaultProps = {
  logoEmpty: '',
  link: null,
}
