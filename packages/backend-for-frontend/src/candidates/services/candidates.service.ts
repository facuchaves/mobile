import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import CuentaPostulanteDto from '../dto/cuenta-postulante.dto'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { Injectable, CacheInterceptor, UseInterceptors } from '@nestjs/common'
import { RedisService } from '../../cache/cache-redis/redis.service'
import DatosPostulanteResDto from '../dto/datos-postulante-res.dto'
import DatosPostulanteResCoreDto from '../dto/core/datos-postulante-res-core.dto'
import { JwtService } from '@nestjs/jwt'
import { DatosPostulanteReqDto } from '../../candidates/dto/datos-postulante-req.dto'
import { DatosPostulanteReqCoreDto } from '../../candidates/dto/core/datos-postulante-req-core.dto'
import { isEmpty, isNil } from 'lodash'
import { PostulanteReferenciaLaboralRequestDto } from '../dto/postulante-referencia-laboral-req.dto'
import { PostulanteReferenciaResponseDto } from '../../candidates/dto/postulante-referencial-res.dto'
import { PostulanteReferenciaEstudioRequestDto } from '../dto/postulante-referencia-estudio-req.dto'

import PutResidencia from '../dto/residencia-put.dto'
import { PREFIX_CURRICULUM } from '../constants'

import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'
import { Residencia } from '../curriculum/dto/residencia-req-post-core.dto'

@Injectable()
export class CandidatesService {
  constructor(
    private readonly candidatesCoreApiService: CandidatesCoreApiService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly applicationCoreApiService: ApplicationCoreApiService
  ) {}

  PREFIX_DATOS_PROTULANTES = 'datosPostulante'
  
  /**
   * Estado de la cuenta del postulante
   * Retorna el estado de la cuenta del postulante
   *
   * @param context
   */
  async cuenta(@Context() context: RequestContext): Promise<CuentaPostulanteDto> {
    const url = '/v0/postulantes/cuenta'

    const cuentaPostulanteDto = await this.redisService.getValueFromSession(context, 'cuentaPostulante', async () => {
      return this.candidatesCoreApiService.get<CuentaPostulanteDto>(context, url)
    })

    return cuentaPostulanteDto
  }

  /**
   * Estado de la cuenta del postulante
   * Retorna el estado de la cuenta del postulante
   *
   * @param context
   */
  async getDatosDePostulante(@Context() context: RequestContext): Promise<DatosPostulanteResDto> {
    const url = '/v0/postulantes'

    const accessToken = this.jwtService.decode(context.oauthPostulante.accessToken)

    const cuentaPostulanteDto = await this.redisService.getValue(
      `${this.PREFIX_DATOS_PROTULANTES}_${accessToken['user_id']}`,
      async () => {
        return this.candidatesCoreApiService.get<DatosPostulanteResCoreDto>(context, url)
      }
    )

    return cuentaPostulanteDto
  }

  /**
   * Borra de redis los datos de postulante.
   *
   * @param context
   */
  resetearDatosDePostulante(@Context() context: RequestContext) {
    const accessToken = this.jwtService.decode(context.oauthPostulante.accessToken)
    this.redisService.del(`${this.PREFIX_DATOS_PROTULANTES}_${accessToken['user_id']}`)

    this.redisService.del(`${PREFIX_CURRICULUM}_${accessToken['user_id']}`)

  }

  /**
   * Estado de la cuenta del postulante
   * Retorna el estado de la cuenta del postulante
   *
   * @param context
   */
  async modificarDatosDePostulante(@Context() context: RequestContext, datosPostulanteReqDto: DatosPostulanteReqDto) {
    const url = '/v0/postulantes'
    const datosPostulanteReqCoreDto: DatosPostulanteReqCoreDto = await this.getDatosDePostulanteReqCoreDto(context, datosPostulanteReqDto)

    const { geolocation, provincia, localidad, direccion, ...datosPostulante }: any = datosPostulanteReqCoreDto

    await this.candidatesCoreApiService.put(context, url, datosPostulante)

    if (geolocation) {
      await this.updateResidence(context, geolocation)
    }

    //Refresco el redis para que la proxima vez consulte el dato actualizado
    this.resetearDatosDePostulante(context)
  }

  /**
   * WORKARROUND
   *
   * Este metodo lo que hace es rellenar el request que viene del front con informacion del postulante logeado,
   * porque desde front se editar por separado los datos de contacto y los datos personales,
   * pero el core modifica todo en un mismo endpoint, y si le llega informacion vacia, nullea los datos.
   *
   * @param context
   * @param datosPostulanteReqDto
   */
  async getDatosDePostulanteReqCoreDto(
    context: RequestContext,
    datosPostulanteReqDto: DatosPostulanteReqDto
  ): Promise<DatosPostulanteReqCoreDto> {
    const datosDePostulanteLogueado = await this.getDatosDePostulante(context)
    let datosPostulanteReqCoreDto = { ...datosPostulanteReqDto }

    // TODO Ver que pasa si no hay datos requeridos ( ni en el req ni en el logeado) si devuelvo 400 antes de llamar

    if (isEmpty(datosPostulanteReqCoreDto.apellido)) {
      datosPostulanteReqCoreDto.apellido = datosDePostulanteLogueado.apellido
    }

    if (isEmpty(datosPostulanteReqCoreDto.email)) {
      datosPostulanteReqCoreDto.email = datosDePostulanteLogueado.email
    }

    if (isEmpty(datosPostulanteReqCoreDto.nombre)) {
      datosPostulanteReqCoreDto.nombre = datosDePostulanteLogueado.nombre
    }

    if (isNil(datosPostulanteReqCoreDto.paisNacimientoId)) {
      datosPostulanteReqCoreDto.paisNacimientoId = datosDePostulanteLogueado.paisNacimiento && datosDePostulanteLogueado.paisNacimiento.id
    }

    if (isEmpty(datosPostulanteReqCoreDto.celularNumero)) {
      datosPostulanteReqCoreDto.celularNumero = datosDePostulanteLogueado.telefonoCelular && datosDePostulanteLogueado.telefonoCelular.numero
    }

    if (isEmpty(datosPostulanteReqCoreDto.celularPrefijo)) {
      datosPostulanteReqCoreDto.celularPrefijo = datosDePostulanteLogueado.telefonoCelular && datosDePostulanteLogueado.telefonoCelular.prefijo
    }

    if (isEmpty(datosPostulanteReqCoreDto.discapacidadDetalle)) {
      datosPostulanteReqCoreDto.discapacidadDetalle = datosDePostulanteLogueado.discapacidad
    }

    if (isEmpty(datosPostulanteReqCoreDto.documento)) {
      datosPostulanteReqCoreDto.documento = datosDePostulanteLogueado.numeroDocumento
    }

    if (isNil(datosPostulanteReqCoreDto.estadoCivilId)) {
      datosPostulanteReqCoreDto.estadoCivilId = datosDePostulanteLogueado.estadoCivil && datosDePostulanteLogueado.estadoCivil.id
    }

    if (isEmpty(datosPostulanteReqCoreDto.fechaNacimiento)) {
      datosPostulanteReqCoreDto.fechaNacimiento = datosDePostulanteLogueado.fechaNacimiento // TODO ver esto
    }

    if (isEmpty(datosPostulanteReqCoreDto.genero)) {
      datosPostulanteReqCoreDto.genero = datosDePostulanteLogueado.genero
    }

    if (isEmpty(datosPostulanteReqCoreDto.telefonoFijoNumero)) {
      datosPostulanteReqCoreDto.telefonoFijoNumero = datosDePostulanteLogueado.telefonoFijo && datosDePostulanteLogueado.telefonoFijo.numero
    }

    if (isEmpty(datosPostulanteReqCoreDto.telefonoFijoPrefijo)) {
      datosPostulanteReqCoreDto.telefonoFijoPrefijo = datosDePostulanteLogueado.telefonoFijo && datosDePostulanteLogueado.telefonoFijo.prefijo
    }

    if (isNil(datosPostulanteReqCoreDto.tieneLicenciaConducir)) {
      datosPostulanteReqCoreDto.tieneLicenciaConducir = datosDePostulanteLogueado.tieneLicenciaConducir
    }

    if (isNil(datosPostulanteReqCoreDto.tieneMovilidadPropia)) {
      datosPostulanteReqCoreDto.tieneMovilidadPropia = datosDePostulanteLogueado.tieneMovilidadPropia
    }

    if (isNil(datosPostulanteReqCoreDto.tipoDocumentoId)) {
      datosPostulanteReqCoreDto.tipoDocumentoId = datosDePostulanteLogueado.tipoDocumento && datosDePostulanteLogueado.tipoDocumento.id
    }

    return datosPostulanteReqCoreDto
  }

  async putResidencia(context: RequestContext, residenciaData: PutResidencia) {
    const url = `/v0/postulantes/residencia`
    this.candidatesCoreApiService.put(context, url, residenciaData)
  }

  async updateResidence(context: RequestContext, geoLocalization: Residencia) { 
    const residenciaData = await this.applicationCoreApiService.post<any>(
      context,
      `/v0/application/localizaciones`,
      geoLocalization
    )

    await this.candidatesCoreApiService.put(context, `/v0/postulantes/residencia`, {
      geolocalizacionId: residenciaData.geolocdefault.id,
      paisId: context.site.idPais,
    })
  }
}
