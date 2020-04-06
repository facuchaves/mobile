import { Controller, Get, Req, Res, Headers } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiUseTags } from '@nestjs/swagger'
import { ConfigService } from './config/config.service'
import { Encrypter } from './encrypter/encrypter'
import buildInfo from './build-info.json'
import { Context } from './decorators/request-context.decorator'
import { RequestContext } from './models/request-context'
import { Site } from './interface/site.interface'

@ApiUseTags('application-comunes')
@Controller()
export class AppController {
  @Get('/site')
  getSite(@Context() context: RequestContext): Site {
    return context.site
  }

  @Get('/build-info')
  getBuildInfo() {
    return buildInfo
  }
}
