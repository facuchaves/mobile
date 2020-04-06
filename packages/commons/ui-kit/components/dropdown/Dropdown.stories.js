/* eslint-disable */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { actions } from '@storybook/addon-knobs'
import { Dropdown } from './Dropdown'
import markdownNotes from './readme.md'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const menuItems = [
  { name: 'Perfil', href: '/candidatos/cuenta' },
  { name: 'Notificaciones', href: '/candidatos/cuenta?seccion=tab-notificaciones' },
  { name: 'Alertas', href: '/candidatos/cuenta?seccion=tab-alertas' },
  { name: 'Privacidad', href: '/candidatos/cuenta?seccion=tab-privacidad' },
  { name: 'Tolki', href: '/publico/mantenimiento' },
  { name: 'Cerrar Sesión', href: '/logout', divider: true },
]
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
            <Dropdown variant="primary" items={menuItems} dropdownArrow={true}>
              Dropdown
            </Dropdown>
          </div>
        )}
      </>
    )
  }
}

storiesOf('Dropdown', module).add('Dropdown', () => <Router><Route component={() => <Story />} /></Router>)
