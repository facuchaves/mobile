import React from 'react'
import { storiesOf } from '@storybook/react'
import { Input } from './Input'
import { Icon } from '../icon/Icon'
import { Checkbox } from '../checkbox/Checkbox'
import markdownNotes from './readme.md'

storiesOf('Input', module)
  .add(
    'Input',
    () => <Input type="text" name="example" placeholder="Example" helperText="This is an example" required={false} />,
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Lighten',
    () => (
      <Input
        lighten
        type="text"
        name="example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Icon Left',
    () => (
      <Input
        type="text"
        name="example"
        placeholder="Example"
        before={<Icon size="22" color="#3D47F5" name="icon-light-lock" />}
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Icon Both',
    () => (
      <Input
        type="password"
        name="example"
        placeholder="Example"
        before={<Icon size="22" color="#3D47F5" name="icon-light-lock" />}
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Icon Password',
    () => (
      <Input type="password" name="example" placeholder="Example" helperText="This is an example" required={false} />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Icon Both - Small',
    () => (
      <Input
        small
        type="password"
        name="example"
        placeholder="Example"
        before={<Icon size="18" color="#3D47F5" name="icon-light-lock" />}
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Checkbox',
    () => (
      <Input
        type="text"
        name="example"
        placeholder="Example"
        before={<Checkbox options={[{ id: '1' }]} />}
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
  .add(
    'Input - Disabled',
    () => (
      <Input
        disabled
        type="password"
        name="example"
        placeholder="Example"
        helperText="This is an example"
        required={false}
      />
    ),
    { notes: { markdown: markdownNotes } }
  )
