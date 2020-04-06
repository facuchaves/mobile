import { Injectable } from '@nestjs/common'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { RequestContext } from '../models/request-context'
import { CoreApiService } from '../core-api/core-api.service'

/**
 * Clase que wrapea el CoreApiService para configurarle antes el ouath que debe utilizar
 */
@Injectable()
export class ApplicationCoreApiService {
  constructor(private readonly coreApiService: CoreApiService) {}

  /**
   * Metodo que setea el oauth de candidates en el context
   * @param context
   */
  populateOauth(context: RequestContext) {
    context.currentOauth = context.oauthApplication
  }

  get<T = any>(context: RequestContext, url: string, config?: AxiosRequestConfig): Promise<T> {
    this.populateOauth(context)
    return this.coreApiService.get(context, url, config)
  }

  delete<T = any>(context: RequestContext, url: string, config?: AxiosRequestConfig): Promise<T> {
    this.populateOauth(context)
    return this.coreApiService.delete(context, url, config)
  }

  post<T = any>(context: RequestContext, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.populateOauth(context)
    return this.coreApiService.post(context, url, data, config)
  }

  put<T = any>(context: RequestContext, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.populateOauth(context)
    return this.coreApiService.put(context, url, data, config)
  }
}
