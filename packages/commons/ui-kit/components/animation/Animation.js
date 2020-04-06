import styled from 'styled-components'
import {
  fadeIn,
  fadeInSlideUp,
  fadeInSlideDown,
  fadeInSlideLeft,
  fadeInSlideRight,
  bounceIn,
  bounceInDown,
  bounceInLeft,
  bounceInRight,
  bounceInUp,
  zoomIn,
} from './mixins'

export const Animation = styled.div`
  ${props => {
    switch (props.name) {
      case 'fadeIn':
        return fadeIn(props)

      case 'fadeInSlideDown':
        return fadeInSlideDown(props)

      case 'fadeInSlideUp':
        return fadeInSlideUp(props)

      case 'fadeInSlideLeft':
        return fadeInSlideLeft(props)

      case 'fadeInSlideRight':
        return fadeInSlideRight(props)

      case 'bounceIn':
        return bounceIn(props)

      case 'bounceInDown':
        return bounceInDown(props)

      case 'bounceInLeft':
        return bounceInLeft(props)

      case 'bounceInRight':
        return bounceInRight(props)

      case 'bounceInUp':
        return bounceInUp(props)

      case 'zoomIn':
        return zoomIn(props)

      default:
        return fadeIn(props)
    }
  }}
`

export const AnimationFixed = styled(Animation)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow-y: auto;
  outline: 0;
  display: block;
  pointer-events: none;
`
