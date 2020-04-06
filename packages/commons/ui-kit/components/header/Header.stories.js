import React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from './Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

storiesOf('Header', module).add('normal', () => (
  <Router>
    <Route component={() => <Header />} />
  </Router>
))
