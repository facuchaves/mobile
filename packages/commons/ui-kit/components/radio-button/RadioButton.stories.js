import React from 'react'
import { storiesOf } from '@storybook/react'
import { RadioButton } from '.'
import markdownNotes from './readme.md'

storiesOf('RadioButton', module)
  .add(
    'RadioButton',
    () => (
      <RadioButton
        id="RBTEST"
        question="RadioButton"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'RadioButton - Disabled',
    () => (
      <RadioButton
        disabled
        id="RBTEST"
        question="RadioButton - Disabled"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'RadioButton - Small',
    () => (
      <RadioButton
        small
        id="RBTEST"
        question="RadioButton"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{}}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'RadioButton - Error',
    () => (
      <RadioButton
        id="RBTEST"
        question="RadioButton - Error"
        options={[{ id: '1', option: 'A' }, { id: '2', option: 'B' }, { id: '3', option: 'C' }]}
        register={() => {}}
        errors={{ RBTEST: {} }}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
