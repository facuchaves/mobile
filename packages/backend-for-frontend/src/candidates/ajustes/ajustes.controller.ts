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
} from '@nestjs/common'
import { ApiUseTags, ApiImplicitFile, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { AjustesService } from './ajustes.service'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { AlertaResCore, AlertaPostCore } from './dto/alertas-dto'
import { PasswordChange } from './dto/password-change-dto'
import { Cuenta, CuentaDelete } from './dto/cuenta-dto'
import { Confidencialidad } from './dto/confidencialidad-dto'
import { SuscripcionItem } from './dto/suscripcion-dto'

@ApiUseTags('postulantes-ajustes')
@Controller('ajustes')
export class AjustesController {
  constructor(private readonly ajustesService: AjustesService) {}

  @Get('/alertas')
  async getAlertas(@Context() context: RequestContext): Promise<AlertaResCore[]> {
    return this.ajustesService.getAlertas(context)
  }

  @Post('/alertas')
  async postAlertas(@Context() context: RequestContext, @Body() alerta?: AlertaPostCore): Promise<AlertaResCore[]> {
    return this.ajustesService.postAlertas(context, alerta)
  }

  @Delete('/alertas/:alertaId')
  async delAlertas(@Context() context: RequestContext, @Param('alertaId') alertaId: number): Promise<any> {
    return this.ajustesService.delAlertas(context, alertaId)
  }

  @Get('/cuenta/validate-email/:email')
  async emailValidate(@Context() context: RequestContext, @Param('email') email: string): Promise<any> {
    return this.ajustesService.emailValidate(context, email)
  }

  @Put('/changePassword')
  async changePassword(@Context() context: RequestContext, @Body() passwords?: PasswordChange) {
    return this.ajustesService.changePassword(context, passwords)
  }

  @Get('/cuenta')
  async getCuenta(@Context() context: RequestContext): Promise<Cuenta> {
    return this.ajustesService.getCuenta(context)
  }

  @Post('/delete-cuenta')
  async delCuenta(@Context() context: RequestContext, @Body() deleteData?: CuentaDelete) {
    return this.ajustesService.delCuenta(context, deleteData)
  }

  @Get('/confidencialidad')
  async getConfidencialidad(@Context() context: RequestContext): Promise<Confidencialidad> {
    return this.ajustesService.getConfidencialidad(context)
  }

  @Put('/confidencialidad')
  async putConfidencialidad(@Context() context: RequestContext, @Body() confidencialidadData?: Confidencialidad) {
    return this.ajustesService.putConfidencialidad(context, confidencialidadData)
  }

  @Get('/suscripciones')
  async getSubscripciones(@Context() context: RequestContext): Promise<SuscripcionItem[]> {
    return this.ajustesService.getSuscripciones(context)
  }

  @Delete('/suscripciones/:suscripcionId')
  async delSubscripciones(
    @Context() context: RequestContext,
    @Param('suscripcionId') suscripcionId: number
  ): Promise<any> {
    return this.ajustesService.delSuscripciones(context, suscripcionId)
  }

  @Put('/suscripciones/:suscripcionId')
  async postSubscripciones(
    @Context() context: RequestContext,
    @Param('suscripcionId') suscripcionId: number
  ): Promise<any> {
    return this.ajustesService.putSuscripciones(context, suscripcionId)
  }
}
