import React from 'react'

import { storiesOf } from '@storybook/react'

import ThemedButton from './index'
import { forEachTheme, ForEachTheme } from '../../themes/helpers'

storiesOf('ThemedButton', module)
  .add('normal', () => <ThemedButton>Aloha</ThemedButton>)
  .add('for all themes', () => forEachTheme(({ theme }) => <ThemedButton>{theme.portal}</ThemedButton>))
  .add('for all themes 2', () => (
    <ForEachTheme>{({ theme }) => <ThemedButton>{theme.portal}</ThemedButton>}</ForEachTheme>
  ))
  .add('for all themes 3', () => (
    <ForEachTheme>
      <ThemedButton>Texto de prueba</ThemedButton>
    </ForEachTheme>
  ))
