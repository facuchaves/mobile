import { actionTypes, ProfileAction, ApplicantStore } from './types'
import { updateObject } from '../utility'

const initialState: ApplicantStore = {
  applicant: undefined,
  // applicant: {
  //   id: 0,
  //   nombre: 'string',
  //   apellido: 'string',
  //   email: 'string',
  //   fotoURL: 'string',
  // },
}

/**
 * Action es el valor devuelto por el action
 * action.payload será el valor que quiero añadir, borrar, etc...
 */
const reducer = (state: ApplicantStore = initialState, action: ProfileAction) => {
  switch (action.type) {
    case actionTypes.SET_SIMPLIFIED_PROFILE:
      if (action.payload) return updateObject<ApplicantStore>(state, { applicant: { ...action.payload } })
      return updateObject<ApplicantStore>(state, { applicant: null })
    default:
      return state
  }
}

export default reducer
