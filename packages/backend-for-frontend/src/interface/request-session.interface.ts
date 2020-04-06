import { Site } from './site.interface'
import Oauth from '../models/oauth'

export interface RequestSession {
  site: Site
  oauth: Oauth
}
