import { Injectable, BadRequestException } from '@nestjs/common'
import { RequestContext } from '../../models/request-context'
import { FichaAvisoResponseDto } from './dto/ficha-aviso-response.dto'
import { ApplicationAvisosService } from '../../application-services/application-avisos.service'
import { get, isEmpty, isNumber } from 'lodash'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'
import { StringHelper } from '../../utils/string-helper'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { PostularAvisoDto } from '../../dto/postular-aviso.dto'
import { SeoHelper } from '../../utils/seo-helper'
import { CorePostulanteAvisoResponseDto } from './dto/core/core-postulante-aviso-response.dto'
import { CoreAvisoResponseDto } from './dto/core/core-aviso-response.dto'
import { CoreAvisoSimilarResponseDto } from './dto/core/core-aviso-similar-response.dto'
import { ApplicationCoreEmpresaResponseDto } from '../../application-services/dto/application-core-empresa-response.dto'
import { ProductoLookAndFeelResponseDto } from '../../candidates/ficha-aviso/dto/producto-look-and-feel-response.dto'
import { AvisoSimilarResponseDto } from './dto/aviso-similar-response.dto'
import { PostulantePostulacionResponse } from './dto/postulante-postulacion-res.dto'
import { PostulantePostulacionResponseCore } from './dto/core/postulante-postulacion-res-core.dto'
import { EmpresaResponseDto } from '../../candidates/ficha-aviso/dto/empresa-response.dto'
import { AvisoSugeridoResponseDto } from '../../candidates/ficha-aviso/dto/aviso-sugerido-response.dto'
import { cartaDePresentacionDto } from '../../dto/carta-presentacion.dto'
import { AvisosService } from '../avisos/avisos.service'
import { AvisosSearchBodyReqCore } from '../avisos/dto/avisos-search-body-req-core.dto'
import { AvisoSearchRes } from '../avisos/dto/avisos-search-res.dto'
import { BusquedasRealacionadasInput } from './dto/busquedas-relacionadas-req-dto'
import { DenunciarAvisoDto } from '../../dto/denunciar-aviso.dto'
import { CurriculumService } from '../curriculum/curriculum.service'

@Injectable()
export class FichaAvisoService {
  constructor(
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private readonly candidatesCoreApiService: CandidatesCoreApiService,
    private readonly applicationAvisosService: ApplicationAvisosService,
    private readonly redisService: RedisService,
    private readonly avisosService: AvisosService,
    private readonly curriculumService: CurriculumService
  ) {}

  /**
   * Devuelve el aviso pasado por id para el postulante logeado.
   *
   * @param context
   * @param idAviso
   */
  async getAviso(context: RequestContext, idAviso: number): Promise<FichaAvisoResponseDto> {
    let fichaAviso

    if (context.isCandidateLogged()) {
      const url = `/v0/postulantes/avisos/${idAviso}`
      const aviso = await this.candidatesCoreApiService.get<CorePostulanteAvisoResponseDto>(context, url)
      fichaAviso = FichaAvisoResponseDto.getFromFichaAvisoPostulantesDto(aviso)
    } else {
      const url = `/v0/application/avisos/${idAviso}`
      const aviso = await this.applicationCoreApiService.get<CoreAvisoResponseDto>(context, url)
      fichaAviso = FichaAvisoResponseDto.getFromFichaAvisoApplicationDto(aviso)
    }

    return fichaAviso
  }

  ocultarInformacionEmpresaConfidencial(empresa: EmpresaResponseDto) {
    delete empresa.denominacion
    delete empresa.logoURL
    delete empresa.id
  }

  /**
   *
   * @param areaId
   * @param subAreaId
   */
  async getAvisosSugeridos(
    context: RequestContext,
    areaId: number,
    subAreaId: number
  ): Promise<Array<AvisoSugeridoResponseDto>> {
    let avisosSugeridosCore: AvisoSearchRes
    if (isNumber(subAreaId)) {
      avisosSugeridosCore = await this.avisosService.search(context, {
        filterData: { subAreasId: [subAreaId] } as AvisosSearchBodyReqCore,
      })
    } else if (isNumber(areaId)) {
      avisosSugeridosCore = await this.avisosService.search(context, {
        filterData: { areasId: [areaId], subAreasId: [] } as AvisosSearchBodyReqCore,
      })
    }
    if (isEmpty(avisosSugeridosCore)) {
      return null
    }

    const { content } = avisosSugeridosCore

    const avisosSugeridos = content.map(
      (avisoSugerido): AvisoSugeridoResponseDto => ({
        titulo: avisoSugerido.titulo,
        empresa: avisoSugerido.empresa,
        localizacion: avisoSugerido.localizacion,
        link:
          avisoSugerido.links[0].rel == 'self'
            ? this.getSeoFriendlyUrl(avisoSugerido.titulo, avisoSugerido.empresa, avisoSugerido.id)
            : avisoSugerido.links[0].href,
      })
    )

    return avisosSugeridos
  }

  /**
   * Devuelve una url formateada del video url.
   *
   * @param videoUrl
   */
  getVideoUrl(videoUrl: string): string {
    if (isEmpty(videoUrl)) {
      return null
    }

    if (videoUrl.includes('vimeo')) {
      const videoId = videoUrl.substring(videoUrl.lastIndexOf('/') + 1)
      return `https://player.vimeo.com/video/${videoId}`
    }

    if (videoUrl.includes('youtube')) {
      const videoId = videoUrl.substring(videoUrl.indexOf('=') + 1)
      return `https://www.youtube.com/embed/${videoId}?wmode=transparent`
    }

    return videoUrl.includes('http') ? videoUrl : `http://${videoUrl}`
  }

  async getProductoLookAndFeel(
    context: RequestContext,
    idAviso: number,
    empresa: EmpresaResponseDto
  ): Promise<ProductoLookAndFeelResponseDto> {
    try {
      if (empresa.confidencial) {
        return null
      }

      const coreProductoLookAndFeel = await this.applicationAvisosService.avisoLookAndFeel(context, idAviso)

      if (isEmpty(coreProductoLookAndFeel)) {
        return null
      }

      let productoLookAndFeel = { ...coreProductoLookAndFeel } as ProductoLookAndFeelResponseDto

      const url = `/v0/application/empresas/empresas/${empresa.id}`
      const datosEmpresa = await this.applicationCoreApiService.get<ApplicationCoreEmpresaResponseDto>(context, url)

      productoLookAndFeel.empresa = {
        nombre: datosEmpresa.denominacion, // TODO StringEscapeUtils.unescapeHtml(datosEmpresa.denominacion)
        industria: datosEmpresa.industria.nombre,
        descripcion: datosEmpresa.descripcion, // TODO StringEscapeUtils.unescapeHtml(datosEmpresa.descripcion)
      }
      return productoLookAndFeel
    } catch (error) {
      // Si falla el core tenemos que mostrar igual el aviso.
      // Loggeo en nivel warm para que sea mas claro el log, de otra manera devolveriamos un 200 y no logeamos.
      context.logger.warn(`Error consultando look and feel para el aviso : ${idAviso}`)
      return null
    }
  }

  async getEstadisticasPuesto(context: RequestContext, fichaAviso: FichaAvisoResponseDto): Promise<string> {
    const puestoId = get(fichaAviso, 'aviso.puesto.puestoId')
    if (!puestoId) {
      return null
    }

    try {
      const { idPais } = context.site
      const url = `/v0/application/estadisticas/puestos/cantidad?paisId=${idPais}&idPuestoNormalizado=${puestoId}`
      const keyEstadisticas = 'ESTADISTICAS_PUESTO_' + idPais + '_' + puestoId
      const estadisticasPuestos = await this.redisService.getValue(keyEstadisticas, async () => {
        return await this.applicationCoreApiService.get(context, url)
      })
      if (!estadisticasPuestos.tieneEstadisticas) {
        return null
      }
      const subAreaSEO = fichaAviso.aviso.subArea.nombre
      const puestoNameSEO = fichaAviso.aviso.puesto.nombre
      const linkSeoSalario = `/salarios/${SeoHelper.getSeoFriendly(subAreaSEO)}/${SeoHelper.getSeoFriendly(
        puestoNameSEO
      )}_${fichaAviso.aviso.puesto.puestoId}.html`
      return linkSeoSalario
    } catch (error) {
      // Si falla el core tenemos que mostrar igual el aviso.
      // Loggeo en nivel warm para que sea mas claro el log, de otra manera devolveriamos un 200 y no logeamos.
      context.logger.warn(`Error consultando estadisticas para el aviso : ${fichaAviso.aviso.id}`)
      return null
    }
  }

  async getAvisosSimilares(context: RequestContext, idAviso: number): Promise<AvisoSimilarResponseDto[]> {
    try {
      const url = `/v0/application/avisos/${idAviso}/similares?excluyeEmpresa=true`
      const coreAvisosSimilares = await this.applicationCoreApiService.get<CoreAvisoSimilarResponseDto[]>(context, url)

      if (isEmpty(coreAvisosSimilares)) {
        return null
      }

      const avisosSimilares = coreAvisosSimilares.map(
        (avisoSimilar): AvisoSimilarResponseDto => ({
          logoURL: avisoSimilar.logoURL,
          titulo: avisoSimilar.titulo,
          empresa: avisoSimilar.empresa,
          localizacion: avisoSimilar.localizacion,
          fechaPublicacion: avisoSimilar.fechaHoraPublicacion,
          link:
            avisoSimilar.links[0].rel == 'self'
              ? this.getSeoFriendlyUrl(avisoSimilar.titulo, avisoSimilar.empresa, avisoSimilar.id)
              : avisoSimilar.links[0].href,
        })
      )
      //TODO empresa: StringEscapeUtils.unescapeHtml(it.empresa),
      return avisosSimilares
    } catch (error) {
      // Si falla el core tenemos que mostrar igual el aviso.
      // Loggeo en nivel warm para que sea mas claro el log, de otra manera devolveriamos un 200 y no logeamos.
      context.logger.warn(`Error consultando avisos similares para el aviso : ${idAviso}`)
      return null
    }
  }

  getSeoFriendlyUrl(titulo: string, denominacionEmpresa: string, idAviso: number): string {
    let seoFriendlyUrl = '/empleos/'
    seoFriendlyUrl += StringHelper.removeCharactersNonPrintable(titulo)

    if (!isEmpty(denominacionEmpresa) && !(denominacionEmpresa.toLowerCase() == 'confidencial')) {
      seoFriendlyUrl += '-'
      seoFriendlyUrl += StringHelper.removeCharactersNonPrintable(denominacionEmpresa)
    }

    seoFriendlyUrl += `-${idAviso.toString()}.html`

    return seoFriendlyUrl
  }

  /**
   * Devuelve el aviso pasado por id para el postulante logeado.
   *
   * @param context
   * @param idAviso
   */
  async postular(
    context: RequestContext,
    idAviso: number,
    postularAvisoDto: PostularAvisoDto
  ): Promise<PostulantePostulacionResponse> {
    try {
      if (postularAvisoDto.actualizarSalario && postularAvisoDto.salarioPretendido) {
        this.actualizarSalario(context, postularAvisoDto.salarioPretendido)
        this.curriculumService.deleteCurriculumCache(context)
      }

      delete postularAvisoDto.actualizarSalario

      const url = `/v0/postulantes/avisos/${idAviso}/postulaciones`
      const postular = await this.candidatesCoreApiService.post<PostulantePostulacionResponseCore>(
        context,
        url,
        postularAvisoDto
      )
      return postular
    } catch (error) {
      postularErrorHandler(error)
    }
  }

  async actualizarSalario(context: RequestContext, salarioPretendido: number) {
    try {
      const urlActualizarSalario = '/v0/postulantes/curriculum/salario'
      this.candidatesCoreApiService.put(context, urlActualizarSalario, {
        salario: salarioPretendido,
      })
    } catch (error) {
      // No hago nada, dejo que siga la postulacion
    }
  }

  getBusquedasRealacionadasRAW(context: RequestContext, params: BusquedasRealacionadasInput) {
    const url = '/v1/topsearch'
    const baseURL = 'http://prepro.api.core.jobs.navent.biz/relatedsearch/'
    return this.candidatesCoreApiService.post(context, url, { ...params }, { baseURL })
  }

  async loadAvisosRecomendados(context: RequestContext, idAviso: number, fichaAviso: FichaAvisoResponseDto | any) {
    const pais = 1
    const usuarioId = 1
    const postulacionId = 1
    const limit = 1
    const module = 1

    if (usuarioId) {
      const config = {
        headers: {
          ApplicationName: 'BUM-frontend',
          Module: module,
        },
      }

      // config.headers['ApplicationName'] = 'BUM-frontend'
      // config.headers['Module'] = module

      const urlIdsAvisosRecomendados = `/recommender/$portal/${pais}?user=${usuarioId}&item=${postulacionId}&limit=${limit}`
      const idsAvisosRecomendados = await this.applicationCoreApiService.get(context, urlIdsAvisosRecomendados, config) // TODO hacer llamada sin oauth y ver a que url.

      const urlAutologin = `/v0/application/postulantes/token`
      const datosPostulante = {
        id: 1,
      }
      const { id } = datosPostulante

      const tokenAutologin = await this.applicationCoreApiService.post(context, urlAutologin, {
        postulanteId: id,
        tipo: 'legacy',
      })

      const urlAvisosRecomendados = `/v0/application/avisos/list?ids=${idsAvisosRecomendados}&tipoDetalle=${320}`
      const avisosRecomendados = await this.applicationCoreApiService.get(context, urlAvisosRecomendados)

      return avisosRecomendados
    }
  }

  /**
   * Denuncia el aviso.
   *
   * @param context
   * @param idAviso
   */
  async denunciar(context: RequestContext, idAviso: number, denunciarAvisoDto: DenunciarAvisoDto) {
    const url = `/v0/postulantes/avisos/${idAviso}/denuncia`
    await this.candidatesCoreApiService.post(context, url, denunciarAvisoDto)
  }

  /**
   * Carta de Postulacion.
   *
   * @param context
   * @param idPostulacion
   */
  async cartaPostulacion(
    context: RequestContext,
    idPostulacion: number,
    cartaDePresentacionDto: cartaDePresentacionDto
  ) {
    const url = `/v0/postulantes/postulaciones/${idPostulacion}/cartaPresentacion`
    const res = await this.candidatesCoreApiService.post(context, url, cartaDePresentacionDto)
    console.log('RESPONSE CORE ' + res)
  }
}

function postularErrorHandler(error) {
  const coreErrorMessage = get(error, 'coreError.message')
  if (coreErrorMessage && error instanceof BadRequestException) {
    throw new BadRequestException(coreErrorMessage)
  }
  throw error
}
