import { createParamDecorator } from '@nestjs/common'
import { RequestContext } from '../models/request-context'

export const Context = createParamDecorator((data, req) => {
  let requestContext = new RequestContext()

  requestContext.site = req.context.site
  requestContext.oauthApplication = req.context.oauth
  requestContext.oauthPostulante = req.context.oauthPostulante
  requestContext.logger = req.context.logger

  return requestContext
})
