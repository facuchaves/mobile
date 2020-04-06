/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import AsyncStorage from '@react-native-community/async-storage'
import { find, omitBy, isNil } from 'lodash'
import StaticEntitiesStore from '../../storages/staticEntities.store'

export const BusquedasRecientes = {}

BusquedasRecientes.get = async () => {
  const busquedas = await AsyncStorage.getItem('busquedasRecientes')
  if (busquedas != null) {
    return JSON.parse(busquedas)
  }
}

BusquedasRecientes.put = async filtros => {
  // const regex = new RegExp('^[a-zA-Z0-9]+s*$')
  let busquedas = await JSON.parse(await AsyncStorage.getItem('busquedasRecientes'))

  const busquedasCount = busquedas != null ? busquedas.length : 0

  const busquedaExiste = find(busquedas, {
    query: filtros.query,
    provinciasId: filtros.provinciasId,
    areasId: filtros.areasId,
    diasFechaPublicacion: filtros.diasFechaPublicacion,
  }) // VALIDAMOS QUE LA QUERY NO EXISTA Y NO SEA VACIO

  // si no tiene uno de los 3 filtros no se guarda
  if (filtros.query || filtros.provinciasId || filtros.areasId) {
    if (busquedasCount === 0) {
      busquedas = [
        {
          query: filtros.query,
          provinciasId: filtros.provinciasId,
          areasId: filtros.areasId,
          diasFechaPublicacion: filtros.diasFechaPublicacion,
        },
      ]
    }

    if (busquedasCount === 3 && !busquedaExiste) {
      busquedas.shift()
    }

    if (busquedasCount > 0 && !busquedaExiste) {
      busquedas.push({
        query: filtros.query,
        provinciasId: filtros.provinciasId,
        areasId: filtros.areasId,
        diasFechaPublicacion: filtros.diasFechaPublicacion,
      })
    }
  }

  await AsyncStorage.setItem('busquedasRecientes', JSON.stringify(busquedas))
}

BusquedasRecientes.getLabel = items => {
  const result = omitBy(items, isNil) // SACA lOS FILTROS NULL
  delete result.diasFechaPublicacion
  const { areas, provincias } = StaticEntitiesStore.getState()

  if (result.provinciasId) {
    result.provinciasId = find(provincias, { id: result.provinciasId }).nombre
  }

  if (result.areasId) {
    result.areasId = find(areas, { id: result.areasId }).nombre
  }
  const string = Object.values(result) // OBTENGO VALUES
  return string.join('-')
}
