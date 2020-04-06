import React from 'react'
import Request, { Get } from '@navent-jobs/utils'

export function getCurrentDomainConfig() {
  const request = new Request()
  request.path = '/api/getDominio'
  request.method = Get

  return request.call()
}

export const defaultConfig = {
  configuracion_pais: {
    analytics_tracking_id: 'UA-77874588-1',
  },
}

const DominioContext = React.createContext({
  config: defaultConfig,
})

export default DominioContext
