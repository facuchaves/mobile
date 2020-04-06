import { Site } from '../interface/site.interface'
import Oauth from './oauth'
import { Logger } from '../logger/logger.service'
import { isEmpty } from 'lodash'

export class RequestContext {
  site: Site
  oauthApplication: Oauth
  currentOauth: Oauth
  oauthPostulante: Oauth
  logger: Logger
  sessionId: any

  isCandidateLogged(): boolean {
    return !isEmpty(this.oauthPostulante)
  }
}
