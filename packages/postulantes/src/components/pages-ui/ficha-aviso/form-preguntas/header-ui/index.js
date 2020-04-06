import React from 'react'
import { Row, Col, ContainerFluid } from '@navent-jobs/ui-kit'
import styled from 'styled-components'
import chatImage from '../../../../../assets/images/chat.svg'

import { makeTitle } from './mixins'

const Logo = styled.img`
  ${() => `
    display: block;
    margin: 0 auto;`}
`

const Title = styled.h3`
  ${props => makeTitle(props)}
`

export const HeaderPreguntas = () => {
  return (
    <ContainerFluid>
      <Row>
        <Col>
          <Logo src={chatImage} alt="Logo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title>Esta empresa quiere saber un poco más de vos</Title>
        </Col>
      </Row>
    </ContainerFluid>
  )
}
