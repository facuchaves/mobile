import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col, ContainerFluid } from '@navent-jobs/ui-kit'
import styled from 'styled-components'
import PreguntaSimple from '../pregunta-simple-ui'
import PreguntaChoice from '../pregunta-choice-ui'
import { makeModalPreguntasBody, makeModalPreguntasFooter } from './mixins'

const ModalPreguntasBody = styled.div`
  ${props => makeModalPreguntasBody(props)}
`

const ModalPreguntasFooter = styled.div`
  ${props => makeModalPreguntasFooter(props)}
`

const PreguntasUI = ({ onPostularClick, onClose, preguntas, register, errors }) => {
  return (
    <>
      <ModalPreguntasBody>
        <ContainerFluid>
          {preguntas.map((pregunta, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Row>
                <Col>
                  {pregunta.simple ? <PreguntaSimple {...pregunta.simple} register={register} errors={errors} /> : null}
                  {pregunta.choice ? <PreguntaChoice {...pregunta.choice} register={register} errors={errors} /> : null}
                </Col>
              </Row>
            </div>
          ))}
        </ContainerFluid>
      </ModalPreguntasBody>
      <ModalPreguntasFooter>
        <ContainerFluid>
          <Row>
            <Col>
              <Button variant="secondary" type="submit" onClick={onClose} block>
                Cancelar
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                block
                onClick={onPostularClick}
                disabled={Object.keys(errors).length > 0}
              >
                Responder y Postularme
              </Button>
            </Col>
          </Row>
        </ContainerFluid>
      </ModalPreguntasFooter>
    </>
  )
}

export default PreguntasUI

PreguntasUI.propTypes = {
  onPostularClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  preguntas: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  register: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
}

PreguntasUI.defaultProps = {
  preguntas: null,
}
