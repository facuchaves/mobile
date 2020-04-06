import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from './Icon'

storiesOf('Icon', module).add('Icon', () => (
  <>
    <Icon color="white" size="20" name="icon-light-add" />
    <Icon color="white" size="20" name="icon-light-add-circle" />
    <Icon color="white" size="20" name="icon-light-arrowhead-up" />
    <Icon color="white" size="20" name="icon-light-arrow-triangle-down" />
    <Icon color="white" size="20" name="icon-light-checkmark-circle-1" />
    <Icon color="white" size="20" name="icon-light-mic-off" />
  </>
))
