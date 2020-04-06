import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { Animation, AnimationFixed } from '../animation/Animation'
import { makeTooltipContainer, makeTooltipArrow, makeTooltipCloseButton, makeTooltipMessage } from './mixins'

export const TooltipCloseButton = styled.button`
  ${props => makeTooltipCloseButton(props)}
`

const TooltipContainer = styled.div`
  ${props => makeTooltipContainer(props)}
`

export const TooltipArrow = styled.span`
  ${props => makeTooltipArrow(props)}
`

export const TooltipMessage = styled.div`
  ${props => makeTooltipMessage(props)}
`

export const Tooltip = props => {
  let { animation, children, toggleElement, placement, visible } = props

  const [isVisible, setVisible] = useState(!!visible)
  const [show, setShow] = useState(visible || !toggleElement)

  const closeClick = () => {
    const visibleState = !isVisible
    setVisible(visibleState)
    toggle(visibleState)
  }

  const toggle = visibleState => {
    !visibleState ? setShow(!show) : false
  }

  return (
    <TooltipContainer>
      {toggleElement && (
        <props.toggleElement
          onClick={() => toggle(isVisible)}
          onMouseEnter={() => toggle(isVisible)}
          onMouseLeave={() => toggle(isVisible)}
        />
      )}

      <Transition in={show} timeout={300}>
        {state => (
          // state change: exited -> entering -> entered -> exiting -> exited
          <>
            <TooltipArrow placement={placement} />

            <Animation name={animation} className={`animation-${state}`}>
              <TooltipMessage placement={placement}>
                {isVisible ? <TooltipCloseButton onClick={closeClick}>x</TooltipCloseButton> : null}
                {children}
              </TooltipMessage>
            </Animation>
          </>
        )}
      </Transition>
    </TooltipContainer>
  )
}

Tooltip.propTypes = {
  animation: PropTypes.string,
  children: PropTypes.string.isRequired,
  toggleElement: PropTypes.object,
  placement: PropTypes.string.isRequired,
  visible: PropTypes.bool,
}

Tooltip.defaultProps = {
  animation: 'fadeIn',
  visible: true,
}
