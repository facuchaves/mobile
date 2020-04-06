/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Alert } from './Alert'

storiesOf('Alert', module)
  .add('Alert success', () => <Alert variant="success">ALERTA!</Alert>)
  .add('Alert info', () => <Alert variant="info">ALERTA!</Alert>)
  .add('Alert warning', () => <Alert variant="warning">ALERTA!</Alert>)
  .add('Alert danger', () => <Alert variant="danger">ALERTA!</Alert>)
