import React from 'react'

import { storiesOf } from '@storybook/react'

import { ErrorBoundary } from './index'

const FailedComponent = () => {
  throw new Error('Ya falló')
}

class ThrowableComponent extends React.Component {
  state = { throwError: false }

  render() {
    const { throwError } = this.state
    if (throwError) {
      throw new Error('Probando ErrorBoundary...')
    }

    return (
      <button type="button" onClick={() => this.setState({ throwError: true })}>
        Boom
      </button>
    )
  }
}

storiesOf('ErrorBoundary', module)
  .add('already failed', () => (
    <ErrorBoundary>
      <FailedComponent />
    </ErrorBoundary>
  ))
  .add('with Boom button', () => (
    <ErrorBoundary>
      <ThrowableComponent />
    </ErrorBoundary>
  ))
