import React from 'react'
import { Textarea, Button, Select } from '@navent-jobs/ui-kit'
import useForm from 'react-hook-form'
import fichaAvisoService, { ErrorDenuncia } from '../../../../services/ficha-aviso-service'

export const FormDenunciar = params => {
  const { register, handleSubmit, errors, setValue, triggerValidation, reset } = useForm()
  const { onClose } = params

  const onSubmit = (data, e) => {
    fichaAvisoService
      .denunciarAviso({
        idAviso: params.aviso.id,
        denuncia: {
          motivo: data.motivo,
          descripcion: data.descripcion,
        },
      })
      .then(response => {
        console.log(response)
        if (onClose) onClose()
        e.target.reset()
        reset()
      })
      .catch(error => {
        if (error instanceof ErrorDenuncia) {
          console.log(error)
        }
      })
      .finally()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        type="text"
        name="motivo"
        label="Motivo de la denuncia"
        options={[
          { value: 'no_es_oferta_laboral', label: 'no_es_oferta_laboral' },
          { value: 'solicitan_dinero', label: 'solicitan_dinero' },
          { value: 'practicas_fraudulentas', label: 'practicas_fraudulentas' },
          { value: 'requerimientos_discriminatorios', label: 'requerimientos_discriminatorios' },
          { value: 'sospechoso_actividades_ilegales', label: 'sospechoso_actividades_ilegales' },
          { value: 'otro', label: 'otro' },
        ]}
        // hook form props:
        validation={register({
          required: 'Debe seleccionar un motivo',
        })}
        errors={errors}
        setValue={setValue}
        triggerValidation={triggerValidation}
      />

      <Textarea
        type="text"
        name="descripcion"
        label="Descripción"
        errors={errors}
        validation={register({
          required: 'Campo requerido',
        })}
      />

      <Button variant="primary" type="submit" block>
        Enviar denuncia
      </Button>

      <Button variant="secondary" type="button" onClick={onClose} block>
        Cancelar
      </Button>
    </form>
  )
}
