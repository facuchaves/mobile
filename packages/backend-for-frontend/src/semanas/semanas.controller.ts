import { Controller, Get, Param, Headers, NotFoundException } from '@nestjs/common'
import { SemanasService } from './semanas.service'
import { ApiUseTags, ApiResponse, ApiImplicitHeader } from '@nestjs/swagger'
import { SemanasDto } from '../dto/semanas.dto'
import { Semanas } from '../interface/semanas.interface'
import { Context } from '../decorators/request-context.decorator'
import { RequestContext } from '../models/request-context'
import { RedisService } from '../cache/cache-redis/redis.service'
// cosnt log = loggerFactory.get('semanaController','semanasComponent')
@ApiUseTags('candidates-semana')
@ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Controller('candidates')
export class SemanasController {
  constructor(private readonly semanasService: SemanasService, private readonly redisService: RedisService) {}

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/semana/:nombreSemana')
  async consultarSemana(
    @Param('nombreSemana') nombreSemana: string,
    @Context() context: RequestContext
  ): Promise<Semanas> {
    const semana = await this.redisService.getValueWithTtl(
      `/semana/${nombreSemana}/${context.site.idPais}`,
      3600 * 2,
      () => this.semanasService.consultarSemana(context, nombreSemana)
    )

    const fechaFinSplit = semana.fechaFin.split('-')
    const fechaFin = new Date(fechaFinSplit[2], fechaFinSplit[1] - 1, fechaFinSplit[0])
    if (new Date() > fechaFin) {
      throw new NotFoundException()
    }

    return semana
  }

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/avisosSemana/:hashtag')
  async consultarAvisosDeSemana(
    @Param('hashtag') hashtag: string,
    @Context() context: RequestContext
  ): Promise<SemanasDto> {
    const avisosDeSemana = await this.redisService.getValueWithTtl(
      `/avisosSemana/${hashtag}/${context.site.idPais}`,
      3600 * 2,
      () => this.semanasService.consultarAvisosDeSemana(context, hashtag)
    )

    return avisosDeSemana
  }
}
