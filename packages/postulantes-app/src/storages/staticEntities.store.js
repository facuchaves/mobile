/* eslint-disable no-console */
import { createStore } from 'redux'

function staticEntitiesStore(state, action) {
  switch (action.type) {
    case 'AREAS':
      return { ...state, areas: action.areas }
    case 'PROVINCIAS':
      return { ...state, provincias: action.provincias }
    case 'PAISES':
      return { ...state, paises: action.paises }
    case 'TIPO_DOCUMENTO':
      return { ...state, tiposDocumento: action.tiposDocumento }
    case 'INDUSTRIAS':
      return { ...state, industrias: action.industrias }
    case 'TIPO_ESTUDIO':
      return { ...state, tiposEstudio: action.tiposEstudio }
    case 'ESTADOS_ESTUDIO':
      return { ...state, estadosEstudio: action.estadosEstudio }
    case 'INSTITUCIONES_EDUCATIVAS':
      return { ...state, institucionesEducativas: action.institucionesEducativas }
    case 'IDIOMAS':
      return { ...state, idiomas: action.idiomas }
    default:
      // console.log(`...staticEntitiesStore: default}`)
      return state
  }
}
export default createStore(staticEntitiesStore)
