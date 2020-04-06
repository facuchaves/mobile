/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Route } from 'react-router-dom'

// Views
import FooterSemanas from './components/footer'
import Header from './components/header'
import Semana from './pages/semana'
// import Footer from './components/footer'
import ErrorBoundary from './error-boundary'

const RouteWithErrorBoundary = props => {
  return (
    <ErrorBoundary {...props}>
      <Route {...props} />
    </ErrorBoundary>
  )
}

const UrlMapping = () => (
  <div>
    <Route component={props => <Header {...props} />} />
    <RouteWithErrorBoundary exact path="/semana/:nombreSemana" component={Semana} />
    <Route
      exact
      path="/avisos"
      component={() => {
        window.location.pathname = '/'
        return null
      }}
    />
    <Route component={FooterSemanas} />
  </div>
)

export default UrlMapping
