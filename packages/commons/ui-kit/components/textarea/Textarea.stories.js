import React from 'react'
import { storiesOf } from '@storybook/react'
import { Textarea } from './Textarea'
import markdownNotes from './readme.md'

storiesOf('Textarea', module)
  .add(
    'Textarea',
    () => (
      <Textarea
        type="text"
        name="example"
        placeholder="Example"
        helperText="This is an example"
        maxLength={20}
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Textarea - Lighten',
    () => (
      <Textarea
        lighten
        type="text"
        name="example"
        placeholder="Example"
        helperText="This is an example"
        maxLength={20}
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Textarea - Disabled',
    () => (
      <Textarea
        disabled
        type="text"
        name="example"
        placeholder="Example"
        helperText="This is an example"
        maxLength={20}
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
