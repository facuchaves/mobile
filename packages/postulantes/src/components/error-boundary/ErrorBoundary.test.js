import React from 'react'
import renderer from 'react-test-renderer'

import { ErrorBoundary } from './ErrorBoundary'

const FailingComponent = () => {
  throw new Error('Fail')
}

describe('ErrorBoundary snapshots', () => {
  it('with no error', () => {
    const tree = renderer.create(<ErrorBoundary>Hola</ErrorBoundary>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('with error', () => {
    // eslint-disable-next-line no-undef
    spyOn(console, 'error')

    const tree = renderer
      .create(
        <ErrorBoundary withBorder>
          <FailingComponent />
        </ErrorBoundary>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
