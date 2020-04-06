/* eslint-disable no-console */
import { createStore } from 'redux'

const defaultState = {
  user: '',
  loginSuccess: false,
}
function sessionStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, loginSuccess: true }
    case 'LOGOUT':
      return { ...state, user: '', loginSuccess: false }
    default:
      // console.log(`...sessionStore: default ${JSON.stringify(state, null, 2)}`)
      return state
  }
}
export default createStore(sessionStore)
