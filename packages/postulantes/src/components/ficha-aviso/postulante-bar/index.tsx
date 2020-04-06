import React, { useState } from 'react'
import { Button, Modal } from '@navent-jobs/ui-kit'
import moment from 'moment'
import useForm from 'react-hook-form'
import { shallowEqual, useSelector } from 'react-redux'
import { AppStore } from '../../../store'

import { FormPreguntas, HeaderPreguntas } from '../../pages-ui/ficha-aviso/form-preguntas'
import FichaAvisoService from '../../../services/ficha-aviso-service'
import { InputAndButtonWrapper, MoneyInput, PostulateBox, PostulateTitle } from './mixins'

// eslint-disable-next-line react/prop-types
const Checkbox = ({ inputId, children, value, onValueChange }) => {
  return (
    <div>
      <label htmlFor={inputId}>
        <input id={inputId} type="checkbox" value={value} onChange={onValueChange} />
        {children}
      </label>
    </div>
  )
}

export interface PostulanteBarProps {
  id: string
  postulacion: { fecha: string; estado: string }
  preguntas: any
  requisitos: any
}

export const PostulanteBar = ({ id, postulacion: postulacionInput, preguntas, requisitos }: PostulanteBarProps) => {
  const [actualizarSalario, setActualizarSalario] = useState(false)
  const [salarioBrutoPretendido, setSalarioBrutoPretendido] = useState('')
  const [postulacion, setPostulacion] = useState(postulacionInput)

  const toggleActualizarSalario = () => setActualizarSalario(!actualizarSalario)
  const handleSalarioBrutoInput = event => setSalarioBrutoPretendido(event.target.value)

  const [visibleModal, setVisibleModal] = useState('')
  const hideModal = () => setVisibleModal('')

  const postularFetchWithoutAnswers = async () => {
    if (!preguntas.length) {
      const response: any = await FichaAvisoService.postPostulacionAviso({
        actualizarSalario,
        id,
        salarioBrutoPretendido,
      })
      setPostulacion({ estado: response.estado, fecha: moment().format('DD-MM-YYYY') })
      return
    }
    setVisibleModal('modal-postulando')
  }

  const postularFetchWithAnswers = async ({ respuestas = [] } = {}) => {
    setVisibleModal('')
    const response: any = await FichaAvisoService.postPostulacionAviso({
      actualizarSalario,
      id,
      respuestas,
      salarioBrutoPretendido,
    })
    setPostulacion({ estado: response.estado, fecha: moment().format('DD-MM-YYYY') })
  }

  // useForm used when salario is required
  const { register, errors, handleSubmit } = useForm({ mode: 'onSubmit' })

  const postulado = postulacion && postulacion.fecha && postulacion.estado
  const postularButton = (
    <Button
      variant={postulado ? 'link-color' : 'primary'}
      onClick={handleSubmit(postularFetchWithoutAnswers)}
      disabled={postulado}
    >
      {postulado ? `POSTULADO EL ${postulacion.fecha}` : ' POSTULARME'}
    </Button>
  )

  // hide component if user is not logged
  const applicant = useSelector((store: AppStore) => store.applicantStore.applicant, shallowEqual)
  if (!applicant) return null

  return (
    <>
      <PostulateBox>
        {postulado ? (
          postularButton
        ) : (
          <>
            <PostulateTitle>Salario bruto pretendido{errors && errors.salario && <> * Required </>}</PostulateTitle>
            <InputAndButtonWrapper>
              <MoneyInput
                name="salario"
                min="0"
                type="number"
                step="any"
                placeholder="Ingresá tu salario bruto pretendido"
                value={salarioBrutoPretendido}
                onChange={handleSalarioBrutoInput}
                ref={register({ required: !!(requisitos && requisitos.salario) })}
              />
              {postularButton}
            </InputAndButtonWrapper>

            <Checkbox inputId="actualizarSalario" value={actualizarSalario} onValueChange={toggleActualizarSalario}>
              Actualizar mi salario en mi CV
            </Checkbox>
          </>
        )}
      </PostulateBox>

      {/* MODAL POSTULANDO */}
      <Modal
        width={600}
        animation="fadeIn"
        onClose={hideModal}
        visible={visibleModal === 'modal-postulando'}
        header={HeaderPreguntas()}
      >
        <FormPreguntas
          onPostularClick={postularFetchWithAnswers}
          // eslint-disable-next-line react/destructuring-assignment
          preguntas={preguntas}
          onClose={hideModal}
        />
      </Modal>
    </>
  )
}
