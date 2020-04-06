import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  CacheInterceptor,
  Query,
  Req,
  Header,
} from '@nestjs/common'
import { AvisoSearchRes } from './dto/avisos-search-res.dto'
import { AvisosService } from './avisos.service'
import { ApiUseTags } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { AvisosSearchBodyReqCore } from './dto/avisos-search-body-req-core.dto'
import { avisosSeachParamsReq } from './dto/avisos-search-params-req.dto'
import { RecomendarAvisosDto } from './dto/recomendar-avisos.dto'
import { ApplicationAvisosService } from '../../application-services/application-avisos.service'
import { ConfigService } from '../../config/config.service'
import { PostulanteAvisoSearchResCore } from '../../candidates/avisos/dto/avisos-postulante-res-core.dto'

@ApiUseTags('avisos-avisos')
@Controller('avisos')
export class AvisosController {
  constructor(
    private readonly service: AvisosService,
    private readonly applicationAvisosService: ApplicationAvisosService,
    private readonly configService: ConfigService
  ) {}
  @Post('/search')
  async search(
    @Context() context: RequestContext,
    @Query() query: avisosSeachParamsReq,
    @Body() filterData?: AvisosSearchBodyReqCore
  ): Promise<AvisoSearchRes> {
    return this.service.search(context, { ...query, filterData })
  }

  @Get('/recommender')
  async recommender(
    @Context() context: RequestContext,
    @Query() query: RecomendarAvisosDto
  ): Promise<PostulanteAvisoSearchResCore[]> {
    const [avisosIds, estrategia] = await this.service.recomendar(context, query)
    const CANTIDAD_CHAR_DESCRIPCION_AVISO = this.configService.get('CANTIDAD_CHAR_DESCRIPCION_AVISO')
    let avisosRelacionados = await this.applicationAvisosService.list(
      context,
      avisosIds,
      CANTIDAD_CHAR_DESCRIPCION_AVISO
    )

    if (query.avisoId) {
      avisosRelacionados = avisosRelacionados.filter(it => it.id != query.avisoId).slice(0, 6)
    }

    return avisosRelacionados
  }
}
