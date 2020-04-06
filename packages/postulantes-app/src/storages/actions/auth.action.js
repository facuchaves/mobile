import { User } from '../../api/session-service'

const getSession = () => {
  return User.checkLogin()
}

export function actions$getSession() {
  return {
    type: 'SESSION',
    payload: {
      user: getSession(),
    },
  }
}
