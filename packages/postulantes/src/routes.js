import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Header, Footer } from '@navent-jobs/ui-kit'
import { ErrorBoundary } from './components/error-boundary'
import { Home } from './pages/home'
import { FichaAvisoPage } from './pages/ficha-aviso'
import { ListaAvisosPage } from './pages/listado-avisos'
import { fetchProfileData } from './store/applicant/actionsToDo'
import { store } from './store'
import { Login } from './components/login'

const initStore = () => {
  // eslint-disable-next-line eqeqeq
  if (store.getState().applicantStore.applicant == undefined) store.dispatch(fetchProfileData())
}

const RouteWithErrorBoundary = props => {
  return (
    <ErrorBoundary {...props}>
      <Route {...props} />
    </ErrorBoundary>
  )
}

const notFound = () => (
  <>
    <img src="https://pa1.narvii.com/6355/084f773e7355cdeef696e31d66f763b1a3dc2a41_hq.gif" alt="404" />
    <h1> (ノಠ益ಠ)ノ彡┻━┻ NOT FOUND </h1>
  </>
)

const Root = () => {
  initStore()
  return (
    <Router>
      <Route component={Header} />
      <Switch>
        {/* Only 1 element, the first match */}
        <RouteWithErrorBoundary path="/empleos-*.html" component={ListaAvisosPage} />
        <RouteWithErrorBoundary exact path="/empleos/:idAviso" component={FichaAvisoPage} />
        <RouteWithErrorBoundary exact path="/home" component={Home} />
        <RouteWithErrorBoundary exact path="/login" component={Login} />
        <Redirect exact from="/" to="/home" /> {/* or 404 page */}
        <Route component={notFound} />
      </Switch>
      <Route component={Footer} />
    </Router>
  )
}

export default Root
