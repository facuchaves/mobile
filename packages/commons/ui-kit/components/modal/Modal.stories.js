/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { actions } from '@storybook/addon-knobs'
import { Button } from '../button/Button'
import { Modal } from './Modal'
import markdownNotes from './readme.md'

class Story extends React.Component {
  state = {
    modalVisible: false,
    modalAnimation: '',
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
    this.setState({ ready: true })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  handleOpenModalRequest = animation => {
    this.setState({
      modalVisible: true,
      modalAnimation: animation,
    })
  }

  handleCloseModalRequest = () => this.setState({ modalVisible: false })

  escFunction = event => {
    if (event.keyCode === 27) {
      this.handleCloseModalRequest()
    }
  }

  render() {
    const { modalAnimation, modalVisible, ready } = this.state

    return (
      <>
        <div id="modal" />

        {ready && (
          <div id="app">
            <Button variant="primary" onClick={this.handleOpenModalRequest.bind(this, 'fadeIn')}>
              fadeIn
            </Button>

            <Button variant="secondary" onClick={this.handleOpenModalRequest.bind(this, 'fadeInSlideDown')}>
              fadeInSlideDown
            </Button>

            <Button variant="secondary" onClick={this.handleOpenModalRequest.bind(this, 'fadeInSlideUp')}>
              fadeInSlideUp
            </Button>

            <Button variant="secondary" onClick={this.handleOpenModalRequest.bind(this, 'fadeInSlideLeft')}>
              fadeInSlideLeft
            </Button>

            <Button variant="secondary" onClick={this.handleOpenModalRequest.bind(this, 'fadeInSlideRight')}>
              fadeInSlideRight
            </Button>

            <Button variant="info" onClick={this.handleOpenModalRequest.bind(this, 'bounceIn')}>
              bounceIn
            </Button>

            <Button variant="info" onClick={this.handleOpenModalRequest.bind(this, 'bounceInDown')}>
              bounceInDown
            </Button>

            <Button variant="info" onClick={this.handleOpenModalRequest.bind(this, 'bounceInLeft')}>
              bounceInLeft
            </Button>

            <Button variant="info" onClick={this.handleOpenModalRequest.bind(this, 'bounceInRight')}>
              bounceInRight
            </Button>

            <Button variant="info" onClick={this.handleOpenModalRequest.bind(this, 'bounceInUp')}>
              bounceInUp
            </Button>

            <Button variant="success" onClick={this.handleOpenModalRequest.bind(this, 'zoomIn')}>
              zoomIn
            </Button>

            <Modal
              animation={modalAnimation}
              visible={modalVisible}
              onClose={this.handleCloseModalRequest}
              header={<h3>Modal title</h3>}
              footer={[
                <Button variant="secondary" onClick={this.handleCloseModalRequest}>
                  Close
                </Button>,
                <Button variant="primary" onClick={this.handleCloseModalRequest}>
                  Save changes
                </Button>,
              ]}
            >
              Modal body text goes here.
            </Modal>
          </div>
        )}
      </>
    )
  }
}

storiesOf('Modal', module).add('Modal', () => <Story />, {
  notes: { markdown: markdownNotes },
})
