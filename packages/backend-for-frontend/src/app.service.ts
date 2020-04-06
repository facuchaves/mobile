import { Injectable, Req } from '@nestjs/common'
import { Request } from 'express'

import { ConfigService } from './config/config.service'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
}
