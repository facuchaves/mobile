import { dateUtils, post, get } from "@navent-jobs/utils"

interface PostularResponse {
  estado: string
  erroresFiltros: any
  id: number
}

export class ErrorDenuncia extends Error {}

class FichaAvisoService {
  public async denunciarAviso(data) {
    return post(`/api/candidates/aviso/${data.idAviso}/denunciar`, data.denuncia, { sendCookies: true })
  }

  public async getRecomendados(idAviso) {
    const recommendedPosts = await get(`/api/avisos/recommender?limit=6&avisoId=${idAviso}`, {
      sendCookies: true,
    })

    const toReturn = recommendedPosts.map(avisoRecomendado => {
      return {
        ...avisoRecomendado,
        tiempoDesdePostulacion: dateUtils.getDiasPublicacion(avisoRecomendado.fechaHoraPublicacion),
      }
    })

    return toReturn
  }

  public postPostulacionAviso = async ({
    id: idAviso,
    respuestas = [],
    salarioBrutoPretendido,
    actualizarSalario,
  }: {
    id: string
    respuestas?: any[]
    salarioBrutoPretendido: string
    actualizarSalario: boolean
  }): Promise<PostularResponse> => {
    return post(
      `/api/candidates/aviso/${idAviso}/postular`,
      {
        respuestas,
        salarioPretendido: salarioBrutoPretendido || null,
        actualizarSalario,
        // origenId: 0,
      },
      {
        sendCookies: true,
      }
    )
  }
}

const fichaAvisoService = new FichaAvisoService()
export default fichaAvisoService
