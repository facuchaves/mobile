/* eslint-disable no-console */
import Request, { Put, Delete, Get, Post, Patch } from '../hooks/api/restClient'
import ScreenIds from '../constants/ScreenIds'
import { showModal } from '../navigation/helpers'

const CurriculumService = {}

const RequestCurriculum = async (method, path, body) => {
  let response = {}
  try {
    const request = new Request()
    request.path = path
    request.method = method
    request.body = body
    response = await request.call()
  } catch (error) {
    console.log(`ERROR CURRICULUM ${error} ENPOINT ${path}`)
    showModal(ScreenIds.BOOT_ERROR)
    response.error = error
    response.status = 500
    return false
  }
  return response
}

CurriculumService.getCurriculum = () => {
  return RequestCurriculum(Get, `/curriculum/me/`, null)
}

CurriculumService.guardarDatosPersonales = values => {
  return RequestCurriculum(Patch, `/candidates/datosPersonales`, values)
}

CurriculumService.guardarSalario = async values => {
  const body = { salario: parseInt(values.salario, 10) }
  return RequestCurriculum(Put, `/curriculum/salario/`, body)
}

CurriculumService.guardarObjetivo = values => {
  return RequestCurriculum(Put, `/curriculum/objetivo`, {
    presentacion: values.objetivo,
  })
}

CurriculumService.borrarObjetivo = () => {
  return RequestCurriculum(Delete, `/curriculum/objetivo`, null)
}

CurriculumService.getReleacionLaboral = () => {
  return RequestCurriculum(Get, `/curriculum/referencia-laboral`, null)
}

CurriculumService.deleteReleacionLaboral = id => {
  return RequestCurriculum(Delete, `/curriculum/referenciaLaboral/${id}`, null)
}

CurriculumService.guardarReferenciaLaboral = (values, id) => {
  if (id) {
    return RequestCurriculum(Put, `/curriculum/referenciaLaboral/${id}`, values)
  }
  return RequestCurriculum(Post, `/curriculum/referenciaLaboral`, values)
}

CurriculumService.getReleacionEducativa = () => {
  return RequestCurriculum(Get, `/curriculum/referencias-estudio`, null)
}

CurriculumService.guardarReferenciaEducativa = (values, id) => {
  if (id) {
    return RequestCurriculum(Put, `/curriculum/referenciaEstudio/${id}`, values)
  }
  // eslint-disable-next-line no-param-reassign
  return RequestCurriculum(Post, `/curriculum/referenciaEstudio`, values)
}

CurriculumService.deleteReferenciaEducativa = id => {
  return RequestCurriculum(Delete, `/curriculum/referenciaEstudio/${id}`, null)
}

CurriculumService.guardarIdiomas = values => {
  const body = values
  if (!!body.conocimientos[0].conocimientoId && !!body.conocimientos[1].conocimientoId) {
    return RequestCurriculum(Put, `/curriculum/conocimientosNormalizados`, body)
  }
  delete body.conocimientos[0].conocimientoId
  delete body.conocimientos[1].conocimientoId
  return RequestCurriculum(Post, `/curriculum/conocimientosNormalizados`, body)
}

CurriculumService.deleteIdioma = arrayIds => {
  return RequestCurriculum(Delete, `/curriculum/conocimientosNormalizados/${JSON.stringify(arrayIds)}`, null)
}

CurriculumService.guardarExperienciaLaboral = (values, id) => {
  const body = values
  body.empresa = { empresaId: null, nombre: values.empresa }
  body.puesto = { puestoId: null, nombre: values.puesto }
  body.cantidadPersonasACargo = values.cantidadPersonasACargo ? parseInt(values.cantidadPersonasACargo, 10) : null
  delete body.alPresente

  if (id) {
    return RequestCurriculum(Put, `/curriculum/experienciasLaborales/${id}`, body)
  }
  // eslint-disable-next-line no-param-reassign
  return RequestCurriculum(Post, `/curriculum/experienciasLaborales`, body)
}

CurriculumService.deleteExperienciaLaboral = id => {
  return RequestCurriculum(Delete, `/curriculum/experienciasLaborales/${id}`, null)
}

CurriculumService.guardarEstudio = (values, id) => {
  const body = values
  body.titulo = { tituloId: null, nombre: values.titulo }
  delete body.alPresente
  if (id) {
    return RequestCurriculum(Put, `/curriculum/estudios/${id}`, body)
  }
  // eslint-disable-next-line no-param-reassign
  return RequestCurriculum(Post, `/curriculum/estudios`, body)
}

CurriculumService.deleteEstudio = id => {
  return RequestCurriculum(Delete, `/curriculum/estudios/${id}`, null)
}

CurriculumService.uploadFoto = async image => {
  const request = new Request()
  request.path = `/load-foto/base64`
  request.method = Post
  request.body = { file: image.data }
  const response = request.call()

  return response
}

export default CurriculumService
