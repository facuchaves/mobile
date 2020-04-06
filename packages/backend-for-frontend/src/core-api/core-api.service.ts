import { Injectable, HttpService, InternalServerErrorException } from '@nestjs/common'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { getExceptionFromStatusCode } from './error-mapping'
import { RequestContext } from '../models/request-context'

@Injectable()
export class CoreApiService {
  constructor(private readonly httpService: HttpService) {}

  get<T = any>(context: RequestContext, url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request(context, {
      method: 'get',
      url,
      ...this.getExtendedConfig(context, config),
    })
  }

  delete<T = any>(context: RequestContext, url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request(context, {
      method: 'delete',
      url,
      ...this.getExtendedConfig(context, config),
    })
  }

  post<T = any>(context: RequestContext, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request(context, {
      method: 'post',
      url,
      data,
      ...this.getExtendedConfig(context, config),
    })
  }

  put<T = any>(context: RequestContext, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request(context, {
      method: 'put',
      url,
      data,
      ...this.getExtendedConfig(context, config),
    })
  }

  private async request<T>(context: RequestContext, config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpService.request(config).toPromise()
      return response.data
    } catch (error) {
      this.handleError(context, error)
    }
  }

  private getExtendedConfig(context: RequestContext, baseConfig: AxiosRequestConfig = {}) {
    const headers = this.getExtendedHeaders(context, baseConfig.headers)

    return {
      ...baseConfig,
      headers,
    }
  }

  private getExtendedHeaders(context: RequestContext, headers: any = {}) {
    const Authorization = context && context.currentOauth ? `Bearer ${context.currentOauth.accessToken}` : ''

    return {
      ...headers,
      // Overriding headers
      Authorization,
      country: 'AR', // TODO: tomar pais del contexto
    }
  }

  private handleError(context: RequestContext, error: { response: AxiosResponse; stack: string; message: string }) {
    // context.logger.debug(`REQUEST:\n${JSON.stringify(error.response.request)}`)
    context.logger.error(`REQUEST CONFIG:\n${JSON.stringify(error.response.config, null, 2)}`)

    if (error.response) {
      context.logger.error('HTTP error from Core API')

      const { data, headers, status, statusText } = error.response
      context.logger.error(`RESPONSE:\n${JSON.stringify({ status, statusText, data, headers }, null, 2)}`)

      throw getExceptionFromStatusCode(error.response.status, error.response.data)
    }

    context.logger.error(`Non HTTP error calling core API: ${error.message}`, error.stack)

    throw new InternalServerErrorException()
  }
}
