/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { User } from '../../api/session-service'
import StaticEntities from '../../api/static-entities-services'
/*
 * Constants
 */

const MINIMUM_DELAY = 3000

/**
 * Hooks
 */
export function useMinimumDelay() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setReady(true)
    }, MINIMUM_DELAY)

    return () => {
      clearTimeout(splashTimer)
    }
  }, [])

  return ready
}

export function useBoot() {
  const [bootReady, setBootReady] = useState(false)
  const [bootError, setError] = useState(false)
  const minimumDelayReady = useMinimumDelay()
  // let error = false

  // eslint-disable-next-line consistent-return
  const validateApi = response => {
    if (!response.isAvailable) {
      setError(true)
      return false
    }
    setError(false)
  }

  useEffect(() => {
    const initApp = async () => {
      /** Public Endpoints */
      validateApi(await StaticEntities.getAreas())
      validateApi(await StaticEntities.getPaises())
      validateApi(await StaticEntities.getProvincias())
      validateApi(await StaticEntities.getTipoDocumento())
      validateApi(await StaticEntities.getIdiomas())
      validateApi(await StaticEntities.getIndustrias())
      validateApi(await StaticEntities.getEstadosEstudio())
      validateApi(await StaticEntities.getTiposEstudio())
      validateApi(await StaticEntities.getInstitucionesEducativas())

      const isLoggedIn = await User.checkLogin()
      if (isLoggedIn) {
        try {
          /** Private Endpoints */
          // console.log('API PRIVADA')
          // CURRICULUM/POSTULACIONES/MENSAJES
        } catch (e) {
          setError(e)
        }
      }
    }
    initApp()

    if (!bootError) {
      setBootReady(true)
    }
  }, [bootError])

  const isReady = minimumDelayReady && bootReady
  const hasError = minimumDelayReady && bootError
  return { isReady, hasError }
}
