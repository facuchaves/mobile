import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from '.'
import markdownNotes from './readme.md'

storiesOf('Checkbox', module)
  .add(
    'Checkbox',
    () => (
      <Checkbox
        id="RBTEST"
        question="Checkbox"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Checkbox - Disabled',
    () => (
      <Checkbox
        disabled
        id="RBTEST"
        question="Checkbox - Disabled"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Checkbox - Small',
    () => (
      <Checkbox
        small
        id="RBTEST"
        question="Checkbox"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Checkbox - Error',
    () => (
      <Checkbox
        id="RBTEST"
        question="Checkbox - Error"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{ RBTEST: {} }}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
