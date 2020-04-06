import React from 'react'
import { storiesOf } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../button/Button'
import markdownNotes from './readme.md'

storiesOf('Tooltip', module).add(
  'Tooltip',
  () => (
    <h1>
      Texto
      <Tooltip
        animation={'fadeIn'}
        visible={true}
        toggleElement={props => <Button {...props}>Hover</Button>}
        placement="bottom-left"
      >
        <h3>Test de personalidad</h3>
        <p>Conocé los puntos fuertes de tu personalidad</p>
      </Tooltip>
    </h1>
  ),
  {
    notes: { markdown: markdownNotes },
  }
)
