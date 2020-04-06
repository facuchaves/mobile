import { actionTypes, Profile, SetSimplifiedProfile } from './types'

export const setSimplifiedProfile = (value: Profile | null): SetSimplifiedProfile => {
  return {
    type: actionTypes.SET_SIMPLIFIED_PROFILE,
    payload: value,
  }
}
