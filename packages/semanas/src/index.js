/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'es6-promise/auto'
import { initApiClient } from '@navent-jobs/utils'
import './es6-object-assign-polyfill'
import TagManager from 'react-gtm-module' // https://github.com/alinemorelli/react-gtm
import { SITE_ID, GTM_ID } from './constants'
import { initialize as initializeGoogleAnalytics } from './services/analytics'
// COMPONENTS
import App from './AppView/App'
import * as serviceWorker from './serviceWorker'

TagManager.initialize({ gtmId: GTM_ID })
initApiClient(SITE_ID)
initializeGoogleAnalytics()

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
