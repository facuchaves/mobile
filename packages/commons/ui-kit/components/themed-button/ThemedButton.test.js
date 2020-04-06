import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import ThemedButton from './ThemedButton'
import { forEachTheme } from '../../themes/helpers'

describe('ThemedButton snapshots', () => {
  it('default props', () => {
    const tree = renderer.create(forEachTheme(({ theme }) => <ThemedButton>{theme.portal}</ThemedButton>)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
