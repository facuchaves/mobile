import { Dispatch } from 'react'
import { setSimplifiedProfile } from './actions'
import { Profile, SetSimplifiedProfile } from './types'
import applicantService from '../../services/applicant-service'

export const fetchProfileData = (): any => {
  return async (dispatch: Dispatch<SetSimplifiedProfile>) => {
    let profile: Profile | null
    try {
      profile = await applicantService.GetSimplifiedInfo()
    } catch (e) {
      profile = null
    }
    dispatch(setSimplifiedProfile(profile))
  }
}
