/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { makeAlert } from './mixins'
import { Animation } from '../animation/Animation'
import { Button } from '../button/Button'

const AlertComponent = styled.div`
  ${props => makeAlert(props)}
`

export class Alert extends Component {
  state = {
    visible: true,
  }

  handleCloseRequest = () => this.setState({ visible: false })

  render() {
    const { children } = this.props
    const { visible } = this.state

    /*    if (!visible) {
      return null
    } */

    return (
      <Transition in={visible} timeout={350}>
        {state => (
          // state change: exited -> entering -> entered -> exiting -> exited

          <Animation name="fadeInSlideDown" className={`animation-${state}`}>
            <AlertComponent {...this.props}>
              {children}
              <Button variant="simple" onClick={this.handleCloseRequest}>
                ×
              </Button>
            </AlertComponent>
          </Animation>
        )}
      </Transition>
    )
  }
}

Alert.propTypes = {
  children: PropTypes.string.isRequired,
}
