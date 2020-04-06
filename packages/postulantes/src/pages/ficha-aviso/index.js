import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import { PageUI } from './ui'
import fichaAvisoService from '../../services/ficha-aviso-service'

const getIdFromURL = url => {
  const withOutExtencion = url.split('.html')
  const id = withOutExtencion[0].split('-')
  return id[id.length - 1]
}

export class FichaAvisoPage extends Component {
  state = {
    loading: false,
    busquedasRelacionadas: [],
    empleosRelacionados: [],
    aviso: null,
    subAreaUrl: null,
    // message: null,
    idAviso: null,
    visibleModal: null,
    avisosRelacionados: null,
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let {
      match: {
        params: { idAviso },
      },
    } = this.props

    idAviso = getIdFromURL(idAviso)
    this.setState({ idAviso })
  }

  handleEmpleoClick = empleo => {
    // eslint-disable-next-line no-console
    console.warn('handleEmpleoClick', { empleo })
  }

  handleDenunciarClick = () => {
    // eslint-disable-next-line no-console
    console.warn('handleDenunciarClick')
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.handleCloseModalRequest()
    }
  }

  fillDataAfterLoadingFicha = async avisoData => {
    const ESTADO_AVISO = {
      activo: 'activo',
      finalizado: 'finalizado',
      eliminado: 'eliminado',
      offline: 'offline',
      vencido: 'vencido',
    }
    this.setState({
      ...avisoData,
      empleosRelacionados: avisoData.avisosSimilares,
      // remove mock
      // busquedasRelacionadas: [{titulo: "esto es un titulo", link: "esto es un link"}],
      busquedasRelacionadas: [],
    })
    const subAreaUrl = lodash
      .startCase(avisoData.aviso.subArea.nombre)
      .replace(/\s+/g, '-')
      .toLowerCase()
    this.setState({ subAreaUrl })
    if (
      avisoData.aviso.estado === ESTADO_AVISO.eliminado ||
      avisoData.aviso.estado === ESTADO_AVISO.offline ||
      avisoData.aviso.estado === ESTADO_AVISO.vencido ||
      avisoData.aviso.estado === ESTADO_AVISO.finalizado
    ) {
      const recommendedResponse = await fichaAvisoService.getRecomendados(avisoData && avisoData.id)
      this.setState({ avisosRelacionados: recommendedResponse, visibleModal: 'modal-avisos-relacionados' })
    }
  }

  showModal = idModal => {
    this.setState({
      visibleModal: idModal,
    })
  }

  hideModal = () => this.setState({ visibleModal: null })

  render() {
    const {
      loading,
      aviso,
      busquedasRelacionadas,
      empleosRelacionados,
      // message,
      visibleModal,
      avisosRelacionados,
      subAreaUrl,
    } = this.state
    return (
      <>
        <PageUI
          idAviso={this.state.idAviso}
          loading={loading}
          aviso={aviso}
          busquedasRelacionadas={busquedasRelacionadas}
          empleosRelacionados={empleosRelacionados}
          onEmpleoClick={this.handleEmpleoClick}
          onDenunciarClick={this.handleDenunciarClick}
          visibleModal={visibleModal}
          showModal={this.showModal}
          hideModal={this.hideModal}
          // cancelFormDenunciar={this.hideModal}
          // submitFormDenunciar={this.submitFormDenunciar}
          avisosRelacionados={avisosRelacionados}
          subAreaUrl={subAreaUrl}
          afterLoadingFicha={this.fillDataAfterLoadingFicha}
        />
      </>
    )
  }
}

FichaAvisoPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idAviso: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
}
