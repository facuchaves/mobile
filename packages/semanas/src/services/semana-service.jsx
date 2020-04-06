import { Request, Get } from '@navent-jobs/utils'
import { isEmpty } from 'lodash'

export class EmptySemana extends Error {}

class SemanaService {
  getSemanaByNombre(nombreSemana) {
    const request = new Request()
    request.path = `/api/candidates/semana/${nombreSemana}`
    request.method = Get
    return request
      .call()
      .catch(error => {
        if (error.response.status === 404) {
          throw new EmptySemana(`Semana ${nombreSemana} no encontrada`)
        }
      })
      .then(semana => {
        if (isEmpty(semana)) {
          throw new EmptySemana(`Semana ${nombreSemana} no encontrada`)
        }
        return semana
      })
  }

  getAvisosByHastag(hashtag) {
    const request = new Request()
    request.path = `/api/candidates/avisosSemana/${hashtag}`
    request.method = Get
    return request.call().then(avisos => {
      // if (isEmpty(avisos)) {
      //   throw new Error('Avisos no encontrados')
      // }
      return avisos
    })
  }
}

const semanaService = new SemanaService()
export default semanaService
