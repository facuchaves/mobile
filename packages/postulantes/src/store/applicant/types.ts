export enum actionTypes {
  SET_SIMPLIFIED_PROFILE = 'SET_SIMPLIFIED_PROFILE',
}

export interface Profile {
  id: number
  nombre: string
  apellido: string
  email: string
  fotoURL: string
}

export interface ApplicantStore {
  applicant?: Profile | null
}

export interface SetSimplifiedProfile {
  type: typeof actionTypes.SET_SIMPLIFIED_PROFILE
  payload: Profile | null
}

export type ProfileAction = SetSimplifiedProfile
