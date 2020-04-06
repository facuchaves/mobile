import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { PortalTheme } from '@navent-jobs/ui-kit'
import moment from 'moment'
import 'moment/locale/es'
import { init } from '@navent-jobs/utils'

import { Provider } from 'react-redux'
import Root from './routes'
import { insertNewRelicScriptInDocument } from './new-relic'
import { NR_LICENSE_KEY, NR_APPLICATION_ID } from './constants'
import { store } from './store'
// import { Counter as CounterHook } from './example-typescript/counterHooks'
// import { Counter } from './example-typescript/counter'

// Initialize moment with ES locale
moment.locale('es')

// initialize New Relic single page application Script
insertNewRelicScriptInDocument(NR_LICENSE_KEY, NR_APPLICATION_ID, document)
// Initialize API client
init({ baseURL: process.env.REACT_APP_API_BASE_URL || '/' })

// eslint-disable-next-line no-console
console.log(
  // eslint-disable-next-line max-len
  '%c\n\n███╗  ██╗ █████╗ ██╗   ██╗███████╗███╗  ██╗████████╗ \n████╗ ██║██╔══██╗██║   ██║██╔════╝████╗ ██║   ██╔══╝ \n██╔██╗██║███████║██╚╗  ██║█████╗  ██╔██╗██║   ██║   \n██║╚████║██╔══██║╚██║ ██╔╝██╔══╝  ██║╚████║   ██║ \n██║ ╚███║██║  ██║ ╚████╔╝ ███████╗██║ ╚███║   ██║ \n╚═╝  ╚══╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚══╝   ╚═╝ \n\nTRABAJANDO PARA QUE CONSIGAS LABURO! \n',
  'font-family:monospace;color:#1976d2;font-size:12px;'
)

ReactDOM.render(
  <Provider store={store}>
    {/* <div>
      <CounterHook />
    </div>
    <div>
      <Counter />
    </div> */}
    <PortalTheme>
      <Root />
    </PortalTheme>
  </Provider>,
  document.getElementById('root')
)
