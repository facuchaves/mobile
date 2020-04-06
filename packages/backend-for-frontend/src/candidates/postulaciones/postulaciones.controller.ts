import { Controller, Get, Param, Query } from '@nestjs/common'
import { PostulacionesService } from './postulaciones.service'
import { ApiUseTags, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { PostulacionesResCoreDto } from '../../dto/postulaciones-res-core.dto'
import { PostulacionesReqDto } from '../../dto/postulacion-req.dto'

@ApiUseTags('candidates-postulaciones')
@Controller('candidates')
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Get('/postulaciones')
  async misPostulaciones(
    @Context() context: RequestContext,
    @Query() query: PostulacionesReqDto
  ): Promise<PostulacionesResCoreDto> {
    return this.postulacionesService.getPostulaciones(context, query)
  }
}
