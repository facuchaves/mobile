/**
 * Dependencies
 */
import styled from 'styled-components'
import React, { Component } from 'react'
import { Container, Row, Col } from '@navent-jobs/ui-kit'

const CustomContainer = styled(Container)`
  border: 1px solid tomato;
`
// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component {
  render() {
    return (
      <CustomContainer>
        <Row>
          <Col>COL 1</Col>
          <Col>COL 2</Col>
          <Col lg={6}>COL 3</Col>
          <Col>COL 4</Col>
          <Col>COL 5</Col>
          <Col>COL 6</Col>
        </Row>
      </CustomContainer>
    )
  }
}
