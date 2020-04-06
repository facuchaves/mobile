import uuid from 'uuid'
import { fetchProfileData } from '../../store/applicant/actionsToDo'
import { setSimplifiedProfile } from '../../store/applicant/actions'
import { store } from '../../store'
import { AuthenticationService, LoginDataType } from '../../services/authentification'

const getCookieData = (key: string, cookieString: string) => {
  if (!cookieString) return null
  const data = cookieString.split(`${key}=`)
  if (!data[1]) return null
  const value = data[1].split(';')[0]
  if (value && value.length) return value
  return null
}
export const loginUser = async (user: string, password: string) => {
  const writeGrailsCookiesOnDocument = (data: LoginDataType): void => {
    const nextMonth = new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString()
    const treeDays = new Date(Date.now() + 3 * 24 * 3600 * 1000).toUTCString()
    const userSessionId = getCookieData('user_session_id', document.cookie) || uuid.v4()
    document.cookie = `token_auth_postulante=${data.access_token}; expires=${treeDays}; path=/`
    document.cookie = `refresh_token_auth_postulante=${data.refresh_token}; expires=${treeDays}; path=/`
    document.cookie = `token_expiration_auth_postulante_milis=${data.expires_in}; expires=${treeDays}; path=/`
    document.cookie = `user_session_id=${userSessionId}; expires=${nextMonth}; path=/`
  }
  const loginData = await AuthenticationService.loginPost(user, password)
  if (!loginData) return
  writeGrailsCookiesOnDocument(loginData)
  store.dispatch(fetchProfileData())
}
export const logoutUser = () => {
  const expiredDate = new Date(0)
  document.cookie = `token_auth_postulante="none"; expires=${expiredDate}; path=/`
  document.cookie = `refresh_token_auth_postulante="none"; expires=${expiredDate}; path=/`
  document.cookie = `token_expiration_auth_postulante_milis="none"; expires=${expiredDate}; path=/`
  store.dispatch(setSimplifiedProfile(null))
}
