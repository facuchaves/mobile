import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { LoginUI } from './loginUI'
import { loginUser, logoutUser } from './login-services'
import { AppStore } from '../../store'

export const Login = () => {
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const applicant = useSelector((store: AppStore) => store.applicantStore.applicant, shallowEqual)

  const handleSubmit = () => loginUser(user, password)
  const handleUser = e => setUser(e.target.value)
  const handlerPassword = e => setPassword(e.target.value)
  return (
    <LoginUI
      handleUser={handleUser}
      handlerPassword={handlerPassword}
      handleSubmit={handleSubmit}
      handleLogout={logoutUser}
      logged={!!applicant}
    />
  )
}
