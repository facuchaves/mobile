import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { Animation, AnimationFixed } from '../animation/Animation'
import { Button } from '../button/Button'
import {
  makeSimpleModalBackdrop,
  makeSimpleModal,
  makeSimpleModalDialog,
  makeSimpleModalContent,
  makeSimpleModalHeader,
  makeSimpleModalBody,
  makeSimpleModalFooter,
} from './mixins'

const ModalBackdrop = styled.div`
  ${props => makeSimpleModalBackdrop(props)}
`

const ModalComponent = styled.div`
  ${props => makeSimpleModal(props)}
`

const ModalDialog = styled.div`
  ${props => makeSimpleModalDialog(props)}
`

const ModalContent = styled.div`
  ${props => makeSimpleModalContent(props)}
`

const ModalHeader = styled.div`
  ${props => makeSimpleModalHeader(props)}
`

const ModalBody = styled.div`
  ${props => makeSimpleModalBody(props)}
`

const ModalFooter = styled.div`
  ${props => makeSimpleModalFooter(props)}
`

export class Modal extends React.Component {
  render() {
    const { animation, header, footer, children, visible, onClose, width } = this.props

    return ReactDOM.createPortal(
      <>
        <Transition in={visible} timeout={350}>
          {state => (
            // state change: exited -> entering -> entered -> exiting -> exited
            <>
              <AnimationFixed name={animation} className={`animation-${state}`}>
                <ModalComponent>
                  <ModalDialog width={width}>
                    <ModalContent>
                      {header && (
                        <ModalHeader>
                          {header}
                          <Button variant="simple" onClick={onClose}>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 18L12 12M18 6L12 12M12 12L18 18M12 12L6 6" stroke="#3CC431" strokeWidth="2" />
                            </svg>
                          </Button>
                        </ModalHeader>
                      )}

                      <ModalBody>{children && children}</ModalBody>

                      <ModalFooter>{footer && footer}</ModalFooter>
                    </ModalContent>
                  </ModalDialog>
                </ModalComponent>
              </AnimationFixed>

              <Animation name="fadeIn" className={`animation-${state}`}>
                <ModalBackdrop onClick={onClose} />
              </Animation>
            </>
          )}
        </Transition>
      </>,
      document.getElementById('modal')
    )
  }
}

Modal.propTypes = {
  animation: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  footer: PropTypes.node,
  width: PropTypes.number,
}

Modal.defaultProps = {
  animation: '',
  visible: false,
  footer: '',
  width: 360,
}
