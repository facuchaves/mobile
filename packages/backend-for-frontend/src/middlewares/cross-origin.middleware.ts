import { Injectable, NestMiddleware } from '@nestjs/common'
import { isDevelopment } from '../config/config.module'

@Injectable()
export class CrossOriginResourseSharingMidd implements NestMiddleware {
  constructor() {}

  async use(req: any, res: any, next: () => void) {
    next()
    // if (isDevelopment) {
    //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    //   // res.setHeader('Access-Control-Allow-Headers', "POST,GET,OPTIONS,PUT,DELETE")
    //   // res.setHeader('Access-Control-Allow-Methods', '*')
    //   res.setHeader('Access-Control-Allow-Credentials', 'true')
    //   console.log('CrossOriginResourseSharingMidd')
    // }
    // return res
  }
}
