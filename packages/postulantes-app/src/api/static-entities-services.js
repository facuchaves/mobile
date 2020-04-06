import { orderBy, find, isEmpty } from 'lodash'
import Config from 'react-native-config'
import Request, { Get } from '../hooks/api/restClient'
import StaticEntitiesStore from '../storages/staticEntities.store'
import CuentaServices from './cuenta-service'

const StaticEntities = {}

const RequestStaticEntities = async (method, path, body) => {
  let response = {}
  try {
    const request = new Request()
    request.path = path
    request.method = method
    request.body = body
    response = await request.call()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`ERROR STATIC  ${error} en path ${path}`)
    // showModal(ScreenIds.BOOT_ERROR)
    return false
  }
  return response
}
const getIdPias = async () => {
  const dataCountry = await CuentaServices.getCountrySelection()
  if (!isEmpty(dataCountry)) {
    return dataCountry.portal_id
  }
  return Config.PORTAL_ID
}

StaticEntities.getAreas = async () => {
  const idPais = await getIdPias()
  const data = await RequestStaticEntities(Get, `/areas/${idPais}`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const areas = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'AREAS', areas })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, areas: data }
}

StaticEntities.getSubAreas = async idArea => {
  const data = await RequestStaticEntities(Get, `/subAreas/${idArea}`, null)

  const isAvailable = !isEmpty(data)
  return { isAvailable, subareas: orderBy(data, ['nombre'], 'asc') }
}

StaticEntities.getPaises = async () => {
  const data = await RequestStaticEntities(Get, `/paises`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const paises = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'PAISES', paises })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, paises: data }
}

StaticEntities.getProvincias = async idPais => {
  const idPaisDominio = await getIdPias()
  const data = await RequestStaticEntities(Get, `/provincias/${idPais || idPaisDominio}`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const provincias = orderBy(data, ['nombre'], 'asc')
    if (!idPais) {
      // se valida que solo se guarde en la store las provincias de la app
      StaticEntitiesStore.dispatch({ type: 'PROVINCIAS', provincias })
    }
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, provincias: data }
}

StaticEntities.getLocalidades = async idProvincia => {
  const localidad = await RequestStaticEntities(Get, `/localidadesPorProvincia/${idProvincia || 29}`, null)

  const isAvailable = !isEmpty(localidad)
  return { isAvailable, localidades: localidad }
}

StaticEntities.getTipoDocumento = async () => {
  const idPais = await getIdPias()
  const data = await RequestStaticEntities(Get, `/tiposDocumento/${idPais}`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const tiposDocumento = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'TIPO_DOCUMENTO', tiposDocumento })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, tiposDocumento: data }
}

StaticEntities.getIndustrias = async () => {
  const data = await RequestStaticEntities(Get, `/industrias`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const industrias = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'INDUSTRIAS', industrias })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, industrias: data }
}

StaticEntities.getTiposEstudio = async () => {
  const idPais = await getIdPias()
  const data = await RequestStaticEntities(Get, `/tiposEstudio/${idPais}`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const tiposEstudio = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'TIPO_ESTUDIO', tiposEstudio })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, tiposEstudio: data }
}

StaticEntities.getEstadosEstudio = async () => {
  const data = await RequestStaticEntities(Get, `/estadosEstudio/`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const estadosEstudio = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'ESTADOS_ESTUDIO', estadosEstudio })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, estadosEstudio: data }
}

StaticEntities.getInstitucionesEducativas = async () => {
  const idPais = await getIdPias()
  const data = await RequestStaticEntities(Get, `/institucionesEducativas/${idPais}`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const institucionesEducativas = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'INSTITUCIONES_EDUCATIVAS', institucionesEducativas })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, institucionesEducativas: data }
}

StaticEntities.getIdiomas = async () => {
  const data = await RequestStaticEntities(Get, `/idiomas`, null)

  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!isEmpty(data)) {
    const idiomas = orderBy(data, ['nombre'], 'asc')
    StaticEntitiesStore.dispatch({ type: 'IDIOMAS', idiomas })
  }

  const isAvailable = !isEmpty(data)
  return { isAvailable, idiomas: data }
}

// GET
StaticEntities.getAreaById = idArea => {
  return find(StaticEntitiesStore.getState().areas, { id: idArea })
}

StaticEntities.getAreaByName = nameArea => {
  return find(StaticEntitiesStore.getState().areas, { nombre: nameArea })
}

StaticEntities.getProvinciaById = idProvincia => {
  return find(StaticEntitiesStore.getState().provincias, { id: idProvincia })
}
StaticEntities.getProvinciaByName = nameProvincia => {
  return find(StaticEntitiesStore.getState().provincias, { nombre: nameProvincia })
}

export default StaticEntities
