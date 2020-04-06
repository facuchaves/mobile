/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { times } from 'lodash'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import { ContainerFluid, Row, Col } from './Grid'

const stories = storiesOf('Grid', module)

stories.addDecorator(withKnobs)

stories
  .add('Container fluid with Row and Columns', () => (
    <ContainerFluid>
      <Row>
        <Col>🍐</Col>
        <Col>🍎</Col>
        <Col>🍊</Col>
        <Col>🍉</Col>
        <Col>🍓</Col>
        <Col>🍒</Col>
      </Row>
    </ContainerFluid>
  ))
  .add('With knobs', () => (
    <ContainerFluid>
      <Row>
        {times(number('Columns', 4), () => (
          <Col>🍐</Col>
        ))}
      </Row>
    </ContainerFluid>
  ))
