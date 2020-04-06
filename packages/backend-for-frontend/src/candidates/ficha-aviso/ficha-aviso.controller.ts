import { Controller, Get, Post, Param, UseInterceptors, CacheInterceptor, Body } from '@nestjs/common'
import { FichaAvisoService } from './ficha-aviso.service'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import CuentaPostulanteDto from '../dto/cuenta-postulante.dto'
import { CandidatesService } from '../services/candidates.service'
import { FichaAvisoResponseDto } from './dto/ficha-aviso-response.dto'
import { PostularAvisoDto } from '../../dto/postular-aviso.dto'
import { PostulantePostulacionResponse } from './dto/postulante-postulacion-res.dto'
import { cartaDePresentacionDto } from '../../dto/carta-presentacion.dto'
import { get } from 'lodash'
import { BusquedasRealacionadasInput } from './dto/busquedas-relacionadas-req-dto'
import moment = require('moment')
import { DenunciarAvisoDto } from '../../dto/denunciar-aviso.dto'

@ApiUseTags('candidates-ficha-aviso')
@Controller('candidates')
export class FichaAvisoController {
  constructor(
    private readonly fichaAvisoService: FichaAvisoService,
    private readonly candidatesService: CandidatesService
  ) {}

  @Get('/me')
  async me(@Context() context: RequestContext): Promise<CuentaPostulanteDto | string> {
    const cuentaPostulanteDto = await this.candidatesService.cuenta(context)
    return cuentaPostulanteDto
  }

  @ApiResponse({
    status: 200,
    type: FichaAvisoResponseDto,
    description: 'Ficha aviso.',
  })
  @Get('/fichaAviso/:idAviso')
  async fichaAviso(
    @Param('idAviso') idAviso: number,
    @Context() context: RequestContext
  ): Promise<FichaAvisoResponseDto> {
    let fichaAviso = await this.fichaAvisoService.getAviso(context, idAviso)

    const [productoLookAndFeel, linkSeoSalario, avisosSimilares] = await Promise.all([
      this.fichaAvisoService.getProductoLookAndFeel(context, idAviso, fichaAviso.aviso.empresa),
      this.fichaAvisoService.getEstadisticasPuesto(context, fichaAviso),
      this.fichaAvisoService.getAvisosSimilares(context, idAviso),
    ])
    fichaAviso.productoLookAndFeel = productoLookAndFeel
    fichaAviso.linkSeoSalario = linkSeoSalario
    fichaAviso.avisosSimilares = avisosSimilares
    fichaAviso.aviso.videoUrl = this.fichaAvisoService.getVideoUrl(fichaAviso.aviso.videoUrl)
    fichaAviso.aviso.seoFriendlyUrl = this.fichaAvisoService.getSeoFriendlyUrl(
      fichaAviso.aviso.titulo,
      fichaAviso.aviso.empresa.denominacion,
      fichaAviso.aviso.id
    )

    if (fichaAviso.aviso.empresa.confidencial) {
      // Si es confidencial oculto informacion.
      this.fichaAvisoService.ocultarInformacionEmpresaConfidencial(fichaAviso.aviso.empresa)
    }

    const { estado } = fichaAviso.aviso
    const avisoFinalizado = estado == 'offline' || estado == 'vencido'
    const areaId = get(fichaAviso, 'aviso.area.id')
    const subareaId = get(fichaAviso, 'aviso.subArea.id')
    let avisosSugeridos = null
    if (avisoFinalizado && (areaId || subareaId)) {
      avisosSugeridos = this.fichaAvisoService.getAvisosSugeridos(context, areaId, subareaId)
    }
    // const id_country = get(fichaAviso, 'aviso.localizacion.paisId')
    // const params: BusquedasRealacionadasInput = {
    //   id_area: areaId,
    //   id_subarea: subareaId,
    //   id_country,
    //   date_from: moment(new Date().setDate(new Date().getDate() - 30)).toISOString(), //30 days ago
    //   date_to: moment(new Date()).toISOString(), //today
    //   max_result: 10,
    // }

    // const busquedasRelacionadasRAW = this.fichaAvisoService.getBusquedasRealacionadasRAW(context, params)
    fichaAviso.avisosSugeridos = await avisosSugeridos
    // TODO create titulo and link with busquedasRelacionadasRAW:{count, key_word, original_key_word: [key_word, count]} and assign to fichaAviso.busquedasRelacionadas
    // fichaAviso.busquedasRelacionadas = await busquedasRelacionadasRAW
    Object.keys(fichaAviso).forEach(key => (fichaAviso[key] === undefined ? delete fichaAviso[key] : '')) //TODO chequear esta polemica
    return fichaAviso
  }

  @ApiResponse({
    status: 200,
    type: PostulantePostulacionResponse,
    description: 'Representa el estado de la postulacion entre otras cosas.',
  })
  @Post('/aviso/:idAviso/postular')
  async postular(
    @Param('idAviso') idAviso: number,
    @Context() context: RequestContext,
    @Body() postularAvisoDto: PostularAvisoDto
  ): Promise<PostulantePostulacionResponse> {
    let postular = await this.fichaAvisoService.postular(context, idAviso, postularAvisoDto)
    return postular
  }

  @Post('/aviso/:idAviso/denunciar')
  async denunciar(
    @Param('idAviso') idAviso: number,
    @Context() context: RequestContext,
    @Body() denunciarAvisoDto: DenunciarAvisoDto
  ) {
    await this.fichaAvisoService.denunciar(context, idAviso, denunciarAvisoDto)
  }

  @Post('/aviso/cartaPresentacion/:idPostulacion')
  async cartaPresentacion(
    @Param('idPostulacion') idPostulacion: number,
    @Context() context: RequestContext,
    @Body() cartaDePresentacionDto: cartaDePresentacionDto
  ) {
    await this.fichaAvisoService.cartaPostulacion(context, idPostulacion, cartaDePresentacionDto)
  }
}
