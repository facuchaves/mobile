import React from 'react'
import { storiesOf } from '@storybook/react'
import { Tabs, Tab } from './Tab'

storiesOf('Tabs', module).add('Tabs', () => (
  <Tabs>
    <Tab title="Title 1">Content 1</Tab>
    <Tab title="Title 2">Content 2</Tab>
    <Tab title="Title 3">Content 3</Tab>
  </Tabs>
))
