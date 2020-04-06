import { Injectable } from '@nestjs/common'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { CurriculumResCore } from './dto/curriculum-res-core.dto'
import { CurriculomRes } from './dto/curriculum-res.dto'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { JwtService } from '@nestjs/jwt'
import { CandidatesService } from '../../candidates/services/candidates.service'
import { ExperienciaLaboralPut } from './dto/experiencia-laboral-put-req-dto'
import { ExperienciaLaboralPost } from './dto/experiencia-laboral-post-req-dto'
import { StaticEntitiesService } from '../../static-entities/static-entities.service'
import { Residencia } from './dto/residencia-res-core.dto'
import { Estudio } from './dto/estudio-req-dto'
import {
  ConocimientoNormalizadoReqPostArray,
  ConocimientoNormalizadoReqDelete,
  ConocimientoNormalizadoReqPutArray,
} from './dto/conocimiento-normalizado-core-dto'

import { PREFIX_CURRICULUM } from '../constants'
import { PostulanteReferenciaEstudioRequestDto } from '../dto/postulante-referencia-estudio-req.dto'
import { PostulanteReferenciaResponseDto } from '../dto/postulante-referencial-res.dto'
import { PostulanteReferenciaLaboralRequestDto } from '../dto/postulante-referencia-laboral-req.dto'
@Injectable()
export class CurriculumService {
  constructor(
    private readonly redisService: RedisService,
    private readonly candidatesCoreApiService: CandidatesCoreApiService,
    private readonly jwtService: JwtService,
    private readonly candidatesService: CandidatesService,
    private readonly staticEntitiesService: StaticEntitiesService
  ) {}

  deleteCurriculumCache(context: RequestContext) {
    const accessToken = this.jwtService.decode(context.oauthPostulante.accessToken)
    this.redisService.del(`${PREFIX_CURRICULUM}_${accessToken['user_id']}`)
  }

  async curriculum(context: RequestContext): Promise<CurriculomRes> {
    const accessToken = this.jwtService.decode(context.oauthPostulante.accessToken)

    return this.redisService.getValue(`${PREFIX_CURRICULUM}_${accessToken['user_id']}`, async () => {
      const [curriculumReq, datosPersonalesReq, residenciaReq, pdaReq] = [
        this.candidatesCoreApiService.get<CurriculumResCore>(context, `/v0/postulantes/curriculum`),
        this.candidatesService.getDatosDePostulante(context),
        this.candidatesCoreApiService.get<Residencia>(context, `/v0/postulantes/residencia`),
        this.getPDA(context),
      ]

      let datosPersonales = null
      try {
        datosPersonales = await datosPersonalesReq
        const residencia = await residenciaReq
        let provincia = null
        let localidad = null
        if (datosPersonales.paisResidencia && datosPersonales.paisResidencia.id) {
          const provincias = await this.staticEntitiesService.provincias(context, datosPersonales.paisResidencia.id)
          provincia = provincias.find(e => e.nombre === residencia.level1) || null
          if (provincia && provincia.id) {
            const localidades = await this.staticEntitiesService.localidades(context, provincia.id)
            localidad = localidades.find(e => e.nombre === residencia.locality)
          }
        }

        datosPersonales.domicilio = {
          pais: datosPersonales.paisResidencia,
          provincia,
          localidad,
          direccion:
            residencia.route && residencia.streetNumber ? `${residencia.route} ${residencia.streetNumber}` : null,
        }
      } catch (e) {}

      const curriculum = await curriculumReq
      // fix duplicated languages and filter
      const conocimientosFiltrados =
        curriculum.conocimientosNormalizados &&
        curriculum.conocimientosNormalizados.reduce(
          (acc, conocimiento) => {
            // if is a language skill
            if (conocimiento && conocimiento.grupo && conocimiento.grupo.id !== 2) {
              acc.otros.push(conocimiento)
            } else {
              acc.idiomas[conocimiento.tipo.id] = {
                ...acc.idiomas[conocimiento.tipo.id],
                [conocimiento.calificador.nombre]: conocimiento,
              }
            }
            return acc
          },
          { idiomas: {}, otros: [] }
        )
      curriculum.conocimientosNormalizados = conocimientosFiltrados && conocimientosFiltrados.otros
      curriculum.idiomas = conocimientosFiltrados && conocimientosFiltrados.idiomas

      let pdaData = null
      try {
        pdaData = await pdaReq
      } catch (e) {}

      return { curriculum, datosPersonales, pda: pdaData }
    })
  }

  async getPDA(context: RequestContext) {
    const url = `/v0/postulantes/pda`
    return this.candidatesCoreApiService.get<any>(context, url)
  }

  async getExperienciaLaboral(context: RequestContext, experienciaLaboralId: number) {
    return this.candidatesCoreApiService.get<any>(
      context,
      `/v0/postulantes/curriculum/experienciasLaborales/${experienciaLaboralId}`
    )
  }

  async postExperienciaLaboral(context: RequestContext, experienciaLaboralData: ExperienciaLaboralPost) {
    const response = await this.candidatesCoreApiService.post<any>(
      context,
      `/v0/postulantes/curriculum/experienciasLaborales/`,
      experienciaLaboralData
    )
    this.deleteCurriculumCache(context)
    return response
  }

  async putExperienciaLaboral(
    context: RequestContext,
    experienciaLaboralId: number,
    experienciaLaboralData: ExperienciaLaboralPut
  ) {
    const response = await this.candidatesCoreApiService.put<any>(
      context,
      `/v0/postulantes/curriculum/experienciasLaborales/${experienciaLaboralId}`,
      experienciaLaboralData
    )
    this.deleteCurriculumCache(context)
    return response
  }

  async deleteExperienciaLaboral(context: RequestContext, experienciaLaboralId: number) {
    const response = await this.candidatesCoreApiService.delete<any>(
      context,
      `/v0/postulantes/curriculum/experienciasLaborales/${experienciaLaboralId}`
    )
    this.deleteCurriculumCache(context)
    return response
  }

  async putObjetivo(context: RequestContext, objetivosData) {
    const toReturn = await this.candidatesCoreApiService.put<any>(
      context,
      `/v0/postulantes/curriculum/presentacion`,
      objetivosData
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async deleteObjetivo(context: RequestContext) {
    const toReturn = await this.candidatesCoreApiService.delete<any>(context, `/v0/postulantes/curriculum/presentacion`)
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async deleteEstudio(context: RequestContext, estudioId: number) {
    const toReturn = await this.candidatesCoreApiService.delete<any>(
      context,
      `/v0/postulantes/curriculum/estudios/${estudioId}`
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async getEstudio(context: RequestContext, estudioId: number) {
    const toReturn = await this.candidatesCoreApiService.get<any>(
      context,
      `/v0/postulantes/curriculum/estudios/${estudioId}`
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async postEstudio(context: RequestContext, estudio: Estudio) {
    const toReturn = await this.candidatesCoreApiService.post<any>(
      context,
      `/v0/postulantes/curriculum/estudios`,
      estudio
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async putEstudio(context: RequestContext, estudioId: number, estudio: Estudio) {
    const toReturn = await this.candidatesCoreApiService.put<any>(
      context,
      `/v0/postulantes/curriculum/estudios/${estudioId}`,
      estudio
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async getReferenciaLaboral(context: RequestContext): Promise<any[]> {
    const curriculum = await this.curriculum(context)
    return (
      curriculum.curriculum.experienciasLaborales &&
      curriculum.curriculum.experienciasLaborales.map(e => {
        return { detalle: `${e.empresa} - ${e.puesto}`, id: e.id }
      })
    )
  }

  /**
   * Actualiza el salario pretendido del postulante logeado.
   *
   * @param context
   * @param salarioAmount
   */
  async updateSalario(context: RequestContext, salario: number) {
    const url = `/v0/postulantes/curriculum/salario`
    const data = { salario: salario }
    const response = await this.candidatesCoreApiService.put(context, url, data)
    this.deleteCurriculumCache(context)
    return response
  }

  async crearReferenciaLaboral(
    context: RequestContext,
    postulanteReferenciaLaboralRequestDto: PostulanteReferenciaLaboralRequestDto
  ) {
    const url = `/v0/postulantes/curriculum/referenciasLaborales`
    this.candidatesCoreApiService.post(context, url, postulanteReferenciaLaboralRequestDto)
    this.deleteCurriculumCache(context)
  }

  async getReferenciaLaboralId(
    context: RequestContext,
    referenciaLaboralId: number
  ): Promise<PostulanteReferenciaResponseDto> {
    const url = `/v0/postulantes/curriculum/referenciasLaborales/${referenciaLaboralId}`
    const response = await this.candidatesCoreApiService.get<PostulanteReferenciaResponseDto>(context, url)
    this.deleteCurriculumCache(context)
    return response
  }

  async modificarReferenciaLaboral(
    context: RequestContext,
    referenciaLaboralId: number,
    postulanteReferenciaLaboralRequestDto: PostulanteReferenciaLaboralRequestDto
  ) {
    const url = `/v0/postulantes/curriculum/referenciasLaborales/${referenciaLaboralId}`
    this.candidatesCoreApiService.put(context, url, postulanteReferenciaLaboralRequestDto)
    this.deleteCurriculumCache(context)
  }

  async eliminarReferenciaLaboral(context: RequestContext, referenciaLaboralId: number) {
    const url = `/v0/postulantes/curriculum/referenciasLaborales/${referenciaLaboralId}`
    this.candidatesCoreApiService.delete(context, url)
    this.deleteCurriculumCache(context)
  }

  async crearReferenciaEstudio(
    context: RequestContext,
    postulanteReferenciaEstudioRequestDto: PostulanteReferenciaEstudioRequestDto
  ) {
    const url = `/v0/postulantes/curriculum/referenciasEstudios`
    this.candidatesCoreApiService.post(context, url, postulanteReferenciaEstudioRequestDto)
    this.deleteCurriculumCache(context)
  }

  async getReferenciaEstudioById(
    context: RequestContext,
    referenciaEstudioId: number
  ): Promise<PostulanteReferenciaResponseDto> {
    const url = `/v0/postulantes/curriculum/referenciasEstudios/${referenciaEstudioId}`
    return await this.candidatesCoreApiService.get<PostulanteReferenciaResponseDto>(context, url)
  }

  async modificarReferenciaEstudio(
    context: RequestContext,
    referenciaEstudioId: number,
    postulanteReferenciaEstudioRequestDto: PostulanteReferenciaEstudioRequestDto
  ) {
    const url = `/v0/postulantes/curriculum/referenciasEstudios/${referenciaEstudioId}`
    this.candidatesCoreApiService.put(context, url, postulanteReferenciaEstudioRequestDto)
    this.deleteCurriculumCache(context)
  }

  async eliminarReferenciaEstudio(context: RequestContext, referenciaEstudioId: number) {
    const url = `/v0/postulantes/curriculum/referenciasEstudios/${referenciaEstudioId}`
    this.candidatesCoreApiService.delete(context, url)
    this.deleteCurriculumCache(context)
  }

  async getReferenciasEstudio(context: RequestContext): Promise<any[]> {
    const curriculum = await this.curriculum(context)
    return (
      curriculum.curriculum.estudios &&
      curriculum.curriculum.estudios.map(e => {
        return { name: e.titulo, id: e.id }
      })
    )
  }

  async getReferenciaEstudio(context: RequestContext): Promise<any[]> {
    const curriculum = await this.curriculum(context)
    return (
      curriculum.curriculum.estudios &&
      curriculum.curriculum.estudios.map(e => {
        return { id: e.id, detalle: `${e.titulo}` }
      })
    )
  }

  async postConocimientoNormalizado(
    context: RequestContext,
    { conocimientos }: ConocimientoNormalizadoReqPostArray
  ): Promise<any[]> {
    const toReturn = await Promise.all(
      conocimientos.map(conocimiento => {
        return this.candidatesCoreApiService.post<any>(
          context,
          `/v0/postulantes/curriculum/conocimientosNormalizados`,
          conocimiento
        )
      })
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async deleteConocimientoNormalizado(context: RequestContext, conocimientos: number[]) {
    const toReturn = await Promise.all(
      conocimientos.map((conocimiento, index) =>
        this.candidatesCoreApiService.delete<any>(
          context,
          `/v0/postulantes/curriculum/conocimientosNormalizados/${conocimiento}`
        ).then(e => e).catch(e => (e && e.response && {error: {id: conocimientos[index], ...e.response}}) || null )
      )
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }

  async putConocimientoNormalizado(context: RequestContext, { conocimientos }: ConocimientoNormalizadoReqPutArray) {
    const toReturn = await Promise.all(
      conocimientos.map(({ conocimientoId, ...data }) =>
        this.candidatesCoreApiService.put<any>(
          context,
          `/v0/postulantes/curriculum/conocimientosNormalizados/${conocimientoId}`,
          data
        )
      )
    )
    this.deleteCurriculumCache(context)
    return toReturn
  }
}
