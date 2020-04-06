/* eslint-disable global-require */
import React from 'react'
import { Thumbnail } from 'native-base'
import PropTypes from 'prop-types'

const Avatar = ({ src, styles }) => {
  const urlImage =
    src !== null
      ? {
          uri: src,
        }
      : require('../../images/avatar_empty.png')

  return <Thumbnail style={styles} source={urlImage} />
}

/*
 * PropTypes
 */

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  styles: PropTypes.oneOfType([PropTypes.object]),
}

Avatar.defaultProps = {
  styles: {},
}

export default Avatar
