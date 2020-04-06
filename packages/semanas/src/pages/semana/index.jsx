/**
 * Dependencias
 */
import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, uniqBy, replace } from 'lodash'
import { Redirect } from 'react-router-dom'

/**
 * Componentes
 */
import Banner from '../../components/banner'
import ListadoAvisos from '../../components/listado-avisos'
import CarrouselHome from '../../components/carrousel-home'

/**
 * Helpers
 */
import dateUtils from '../../models/dateUtils'

/**
 * Models & Services
 */
import Aviso from '../../models/aviso'
import semanaService, { EmptySemana } from '../../services/semana-service'

// Analytics
import * as GA from '../../services/analytics'

// Error
const errorImageUrl = 'https://careers.avanade.com/jscore/images/http/fatal.png'

export default class SemanaPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      semana: null,
      avisos: [],
      loadingListado: true,
    }
  }

  componentDidMount() {
    GA.pageView(window.location.pathname, undefined, 'Semanas')
    this.loadBanner()
  }

  loadBanner() {
    const {
      match: {
        params: { nombreSemana },
      },
    } = this.props

    this.setState({ loadingHeader: true, hasError: false })
    semanaService
      .getSemanaByNombre(nombreSemana)
      .then(semana => {
        this.setState({ semana })
        this.loadListadoAvisosByHashtag(replace(semana.hashtag, '#', ''))
      })
      .catch(error => {
        if (error instanceof EmptySemana) {
          this.setState({
            semanaNotFound: true,
          })
        }
        this.setState({
          hasError: true,
          loadingListado: false,
        })
      })
      .finally(() => this.setState({ loadingHeader: false }))
  }

  loadListadoAvisosByHashtag(hashtag) {
    this.setState({ loadingListado: true, errorListado: false })
    semanaService
      .getAvisosByHastag(hashtag)
      .then(response => {
        if (!isEmpty(response.content)) {
          const avisos = response.content.map(aviso => {
            return new Aviso(
              aviso.id,
              aviso.titulo,
              aviso.empresa,
              aviso.localizacion,
              dateUtils.parsearFecha(aviso.fechaPublicacion),
              aviso.links[0].href,
              aviso.logoURL
            )
          })

          this.setState({ avisos: avisos.sort(() => Math.random() - 0.5) })
        }
      })
      .catch(() => {
        this.setState({
          errorListado: true,
        })
      })
      .finally(() => this.setState({ loadingListado: false }))
  }

  renderOnError() {
    return (
      <div className="ErrorScreen" style={{ textAlign: 'center' }}>
        <img src={errorImageUrl} alt="error" />
        <h2>Algo no salió bien.</h2>
      </div>
    )
  }

  renderOnSuccess() {
    const { avisos, loadingListado, errorListado, semana, loadingHeader } = this.state

    let listLogos

    if (!isEmpty(avisos)) {
      listLogos = avisos.filter(({ logo }) => !isEmpty(logo)).map(({ logo }) => ({ logo }))
      listLogos = uniqBy(listLogos, 'logo')
    }

    return (
      <>
        <Banner semana={semana} isLoading={loadingHeader} />
        <CarrouselHome logosUrls={listLogos} isLoading={loadingListado} />
        <ListadoAvisos avisos={avisos} isLoading={loadingListado} hasError={errorListado} />
      </>
    )
  }

  render() {
    const { hasError, semanaNotFound } = this.state

    if (semanaNotFound) {
      return <Redirect to="/avisos" />
    }

    if (hasError) {
      return this.renderOnError()
    }

    return this.renderOnSuccess()
  }
}

SemanaPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      nombreSemana: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
