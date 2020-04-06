import React, { ChangeEvent } from 'react'
import { Container, Row, Button } from '@navent-jobs/ui-kit'

export interface LoginProps {
  handleUser(e: ChangeEvent<HTMLInputElement>): void
  handlerPassword(e: ChangeEvent<HTMLInputElement>): any
  handleSubmit(): void
  handleLogout(): void
  logged: boolean
}

export const LoginUI = ({ handleUser, handlerPassword, handleSubmit, handleLogout, logged }: LoginProps) => {
  const loggedComp = (
    <Button variant="error" type="submit" onClick={handleLogout}>
      Logout
    </Button>
  )
  const unLoggedComp = (
    <>
      <input placeholder="Usuario" name="user" type="text" onChange={handleUser} />
      <input placeholder="Contraseña" name="password" type="password" onChange={handlerPassword} />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </>
  )

  return (
    <Container>
      <Row>{logged ? loggedComp : unLoggedComp}</Row>
    </Container>
  )
}
