import React from 'react'
import { storiesOf } from '@storybook/react'
import { Select } from './Select'
import { Icon } from '../icon/Icon'
import { Checkbox } from '../checkbox/Checkbox'
import markdownNotes from './readme.md'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

storiesOf('Select', module)
  .add(
    'Select',
    () => (
      <Select
        options={options}
        name="example"
        label="Example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Select - Lighten',
    () => (
      <Select
        lighten
        options={options}
        name="example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Select - Icon Place',
    () => (
      <Select
        options={options}
        name="example"
        before={<Icon size="22" color="rgba(0, 0, 24, 0.16)" name="icon-light-location-pin" />}
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Select - Checkbox',
    () => (
      <Select
        options={options}
        name="example"
        before={<Checkbox options={[{ id: '1' }]} />}
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Select - Small',
    () => (
      <Select
        small
        options={options}
        name="example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Select - Disabled',
    () => (
      <Select
        disabled
        options={options}
        name="example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
