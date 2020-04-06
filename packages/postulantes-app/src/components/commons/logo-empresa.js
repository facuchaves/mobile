/* eslint-disable global-require */
import React from 'react'
import { Thumbnail } from 'native-base'
import PropTypes from 'prop-types'

const Logo = ({ LogoUrl, styles }) => {
  const urlImage =
    LogoUrl !== null
      ? {
          uri: LogoUrl,
        }
      : require('../../images/logo-empty.png')

  return <Thumbnail style={styles} source={urlImage} />
}

/*
 * PropTypes
 */

Logo.propTypes = {
  LogoUrl: PropTypes.string.isRequired,
  styles: PropTypes.oneOfType([PropTypes.object]),
}

Logo.defaultProps = {
  styles: {},
}

export default Logo
