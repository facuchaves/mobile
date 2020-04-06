/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Request, { Put, Delete, Get, Post, Patch } from '../hooks/api/restClient'
import ScreenIds from '../constants/ScreenIds'
import { showModal } from '../navigation/helpers'

const AvisosService = {}

const RequestAviso = async (method, path, body) => {
  let response = {}
  try {
    const request = new Request()
    request.path = path
    request.method = method
    request.body = body
    response = await request.call()
  } catch (error) {
    console.log(`ERROR AVISO ${error} api path ${path}`)
    response.error = error
    response.status = 500
    showModal(ScreenIds.BOOT_ERROR)
  }
  return response
}

AvisosService.saveCartaPostulacion = (idPostulacion, body) => {
  return RequestAviso(Post, `/candidates/aviso/cartaPresentacion/${idPostulacion}`, body)
}

AvisosService.getAvisosRecomendados = idAviso => {
  const id = idAviso
  return RequestAviso(Get, `/avisos/recommender?limit=6&avisoId=${id}`, null)
}

export default AvisosService
