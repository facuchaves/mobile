import React from 'react'
import { storiesOf } from '@storybook/react'
import { Toggle } from './Toggle'
import markdownNotes from './readme.md'

storiesOf('Toggle', module)
  .add('Toggle default', () => <Toggle />, { notes: { markdown: markdownNotes } })

  .add('Toggle disable', () => <Toggle disabled />, { notes: { markdown: markdownNotes } })

  .add('Toggle small', () => <Toggle small />, { notes: { markdown: markdownNotes } })

  .add('Toggle disable & small', () => <Toggle disabled small />, { notes: { markdown: markdownNotes } })
