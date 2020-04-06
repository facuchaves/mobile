import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

import { get } from 'lodash'

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    response

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json(exception.getResponse())
    }

    const { logger } = request.context
    //Si es un error inesperado, logeo
    logger.error(`Error inesperado desde filter: ${exception}`, exception.stack)

    const accessToken = get(request, 'context.oauth.accessToken', null)
    logger.debug(accessToken ? `Usuario con access token: ${accessToken}` : 'Usuario sin access token')

    return response.status(500)
  }
}
