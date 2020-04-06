import { isEmpty } from 'lodash'
import { post } from '@navent-jobs/utils'
import { listadoMock } from './listado-avisos.mock'
import { SearchStack } from '../../components/listado-avisos/ultimas-busquedas/search-stack'

export const makeMockRequest = (setLoading: Function, setListado: Function): Function => {
  const mockRequest = () => {
    setLoading(true)
    setTimeout(() => {
      setListado(listadoMock)
      setLoading(false)
    }, 2000)
  }
  return mockRequest
}

export const parseQuery = urlToParseParam => {
  const filtros: { [key: string]: any } = {
    area: [],
    categoria: [],
    busqueda: [],
    publicacion: [],
    seniority: [],
    subarea: [],
  }
  const urlToParse = urlToParseParam.split('.html')[0]
  const urlSpliteada = urlToParse.split('/empleos-')[1].split('-')

  let lastKey = ''
  urlSpliteada.forEach(currentWord => {
    if (filtros[currentWord]) {
      lastKey = currentWord
    } else {
      filtros[lastKey].push(currentWord)
    }
  })

  const keys = Object.keys(filtros)
  const keysToRemove: string[] = []

  keys.forEach(key => {
    filtros[key] = filtros[key].join(' ')
    if (isEmpty(filtros[key])) {
      keysToRemove.push(key)
    }
  })

  keysToRemove.forEach(keyToRemove => {
    delete filtros[keyToRemove]
  })

  return filtros
}

interface FetchAvisos {
  listado: any
  setLoading(state: any)
  setListado(state: any)
  setPage: any
  page?: number
  pageSize?: number
  filtrosAplicables?: any
  setLoadingMore?: any
}

export const createFetchAvisos = ({
  listado,
  setLoading,
  setListado,
  page = 0,
  pageSize = 20,
  filtrosAplicables = {},
  setPage,
  setLoadingMore,
}: FetchAvisos) => {
  const url = `api/avisos/search?pageSize=${pageSize}&page=${page}`
  const { busqueda: query } = parseQuery(window.location.href)
  const realRequest = () => {
    if (setLoadingMore) setLoadingMore(true)
    async function fetchData() {
      const result = await post(url, {
        ...filtrosAplicables,
        busquedaExtendida: true,
        query,
        tipoDetalle: 320,
      })
      if (!listado) setListado(result)
      else setListado({ ...result, content: [...listado.content, ...result.content] })
      if (setPage) setPage(page + 1)
      setLoading(false)
      if (setLoadingMore) setLoadingMore(false)
      if (result && result.content && result.content.length)
        SearchStack.getInstance().push({ query, ...filtrosAplicables })
    }
    fetchData()
  }
  return realRequest
}
