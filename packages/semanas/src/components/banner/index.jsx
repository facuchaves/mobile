/**
 * Dependencias
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

/**
 * Assets
 */
import LoaderBanner from '../empty-states/banner-empty'

const errorImageUrl = 'https://careers.avanade.com/jscore/images/http/fatal.png'

const ImageHeader = styled.img`
  height: 265px;
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`

export default class Banner extends React.PureComponent {
  renderOnLoad() {
    return <LoaderBanner />
  }

  renderOnError() {
    return (
      <div className="main">
        <img src={errorImageUrl} alt="error" />
        <h1>Ocurrio un error consultando la semana.</h1>
      </div>
    )
  }

  renderOnSuccess() {
    const { semana } = this.props

    return (
      <div style={{ overflow: 'hidden' }}>
        {!isEmpty(semana) && (
          <ImageHeader src={semana.urlImagenHeader} alt="" />
          /*         <img
            src={`http://imgbum.jobscdn.com/postulantes/semana/${semana.urlImagenHeader.substring(
              semana.urlImagenHeader.indexOf('//') + 1
            )}`}
            alt=""
            style={{
              height: '264px',
              display: 'block',
              position: 'relative',
              left: '50%',
              transform: 'translate(-50%)',
            }}
          /> */
        )}
      </div>
    )
  }

  render() {
    const { isLoading } = this.props

    if (isLoading) {
      return this.renderOnLoad()
    }

    return this.renderOnSuccess()
  }
}

Banner.propTypes = {
  semana: PropTypes.shape({
    urlImagenHeader: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
}

Banner.defaultProps = {
  isLoading: false,
  semana: null,
}
