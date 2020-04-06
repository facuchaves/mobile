import {
  Controller,
  Body,
  Post,
  UploadedFile,
  Param,
  UploadedFiles,
  UseInterceptors,
  Bind,
  Get,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common'
import { ApiUseTags, ApiImplicitFile, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { MensajesService } from './mensajes.service'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { MensajesCoreResponse, MensajeDirecto, MensajeDirectoPost } from './dto/mensajes-dto'

@ApiUseTags('postulantes-mensajes')
@Controller('/')
export class MensajesController {
  constructor(private readonly mensajesService: MensajesService) {}

  @Get('/mensajes')
  async getMensajes(@Context() context: RequestContext): Promise<MensajesCoreResponse> {
    return this.mensajesService.getMensajes(context)
  }

  @Post('/mensajes/:mensajeId/leido')
  async marcarLeido(@Param('mensajeId') mensajeId: number, @Context() context: RequestContext): Promise<any> {
    return this.mensajesService.marcarLeido(context, mensajeId)
  }

  @Get('/mensajes/:mensajeId/:type')
  async getAnyMensajes(
    @Param('mensajeId') mensajeId: number,
    @Context() context: RequestContext,
    @Param('type') type: string
  ): Promise<MensajeDirecto> {
    const messageType = type.toLowerCase()
    if (messageType === 'directo') {
      return this.mensajesService.getMensajesDirectos(context, mensajeId)
    }
    if (messageType === 'postulacion') {
      const postulacionId = mensajeId
      return this.mensajesService.getMensajesPostulaciones(context, postulacionId)
    }

    throw new BadRequestException('message type must be "directo" or "postulacion"')
  }

  // @Get('/mensajesDirectos/:mensajeId')
  // async getMensajesDirectos(
  //   @Param('mensajeId') mensajeId: number,
  //   @Context() context: RequestContext
  // ): Promise<MensajeDirecto> {
  //   return this.mensajesService.getMensajesDirectos(context, mensajeId)
  // }

  @Post('/mensajesDirectos/:mensajeId')
  async postMensajeDirecto(
    @Param('mensajeId') mensajeId: number,
    @Context() context: RequestContext,
    @Body() mensajeData: MensajeDirectoPost
  ): Promise<any> {
    return this.mensajesService.postMensajeDirecto(context, mensajeId, mensajeData)
  }

  // @Get('/mensajesPostulaciones/:mensajeId')
  // async getMensajesPostulaciones(
  //   @Param('mensajeId') mensajeId: number,
  //   @Context() context: RequestContext
  // ): Promise<MensajeDirecto> {
  //   return this.mensajesService.getMensajesPostulaciones(context, mensajeId)
  // }

  @Post('/mensajesPostulaciones/:mensajeId')
  async postMensajePostulaciones(
    @Param('mensajeId') mensajeId: number,
    @Context() context: RequestContext,
    @Body() mensajeData: MensajeDirectoPost
  ): Promise<any> {
    return this.mensajesService.postMensajePostulaciones(context, mensajeId, mensajeData)
  }

  @Get('/postulantes/notificaciones')
  async getNotificaciones(@Context() context: RequestContext): Promise<any> {
    return this.mensajesService.getNotificaciones(context)
  }

  // replace this endpoint do not use
  @Get('/postulantes/getUnreadMessagesCount')
  async getUnreadMessages(@Context() context: RequestContext): Promise<any> {
    return this.mensajesService.getUnreadMessages(context)
  }
}
