import React from 'react'
import { storiesOf } from '@storybook/react'
import { Link } from './Link'
import { BrowserRouter as Router, Route } from 'react-router-dom'

storiesOf('Link', module).add('Link', () => (
  <>
    <Router>
      <Route component={() => <Link href="/">Link to #</Link>} />{' '}
    </Router>
  </>
))
