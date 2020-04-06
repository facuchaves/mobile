import { Controller, Post, Param, Body } from '@nestjs/common'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { AutentificacionService } from './autentificacion.service'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import AutentificacionResDto from './dto/autentificacion-res.dto'
import AutentificacionReqDto from './dto/autentificacion-req.dto'
import SignUp from './dto/sign-up-req.dto'

@ApiUseTags('candidates-autentificacion')
@Controller('autentificacion')
export class AutentificacionController {
  constructor(private readonly autentificacionService: AutentificacionService) {}

  @Post('/login/')
  async login(
    @Context() context: RequestContext,
    @Body() autentificacionReqDto: AutentificacionReqDto
  ): Promise<{ AutentificacionResDto: AutentificacionResDto }> {
    const login = await this.autentificacionService.login(
      context,
      autentificacionReqDto.username,
      autentificacionReqDto.password
    )
    return login
  }

  @Post('/logout/:token')
  async logout(@Param('token') token: string, @Context() context: RequestContext) {
    const logout = await this.autentificacionService.logout(context, token)
    return logout
  }

  @Post('/login-encrypted/')
  async loginEncrypted(@Context() context: RequestContext, @Body() autentificacionReqDto: AutentificacionReqDto) {
    const login = await this.autentificacionService.login(
      context,
      autentificacionReqDto.username,
      autentificacionReqDto.password
    )
    const encryptedData = this.autentificacionService.encrypt(login)
    return encryptedData
  }

  @Post('/register/')
  async signUp(@Context() context: RequestContext, @Body() signUpData: SignUp) {
    return this.autentificacionService.signUp(context, signUpData)
  }
}
