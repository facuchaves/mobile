import React, { Component } from 'react'
import { PortalTheme } from '@navent-jobs/ui-kit'

import './App.css'

import UrlMapping from '../routes'

class App extends Component {
  render() {
    return (
      <PortalTheme>
        <div className="App">
          <UrlMapping />
        </div>
      </PortalTheme>
    )
  }
}

export default App
