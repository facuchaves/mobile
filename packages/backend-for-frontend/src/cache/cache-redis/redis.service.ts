import * as redis from 'redis'
import { promisify } from 'util'
import { Injectable } from '@nestjs/common'
import CacheConfigService from './cache-config.service'
import { RequestContext } from '../../models/request-context'

const getSessionKey = sessionId => `_TODO_session_${sessionId}`
const getCoreOAuthDataKey = sessionId => `nest_core_oauth_${sessionId}`

@Injectable()
export class RedisService {
  client: redis.RedisClient

  constructor(private readonly cacheConfigService: CacheConfigService) {
    const redisOptions = this.cacheConfigService.createCacheOptions()
    this.client = redis.createClient(redisOptions.port, redisOptions.host)

    this.client.on('error', err => {
      // TODO: log somewhere else
      console.error(err)
    })
  }
  async getValueFromSession(context: RequestContext, field: string, callback) {
    return this.getHValue(context.sessionId, field, callback)
  }

  /**
   * Metodo que busca en la cache un valor y si no esta ejecuta el callback para buscar el valor y lo setea en redis.
   */
  async getValue(key: string, callback) {
    const cachedValue = await this.get(key)
    if (cachedValue) {
      return JSON.parse(cachedValue)
    }

    const currentValue = await callback()
    await this.set(key, JSON.stringify(currentValue))
    return currentValue
  }
  /**
   * Metodo que busca en la cache un valor y si no esta ejecuta el callback para buscar el valor y lo setea en redis.
   */
  async getValueWithTtl(key: string, ttl: number, callback) {
    const cachedValue = await this.get(key)
    if (cachedValue !== null && cachedValue !== undefined && cachedValue !== 'undefined') {
      return JSON.parse(cachedValue)
    }

    const currentValue = await callback()
    await this.setWithTtl(key, JSON.stringify(currentValue), ttl)
    return currentValue
  }

  /**
   * Metodo que busca en la cache un valor y si no esta ejecuta el callback para buscar el valor y lo setea en redis.
   */
  async getHValue(key: string, field: string, callback) {
    const cachedValue = await this.hget(key, field)
    if (cachedValue !== null && cachedValue !== undefined && cachedValue !== 'undefined') {
      return JSON.parse(cachedValue)
    }
    const currentValue = await callback()
    this.hset(key, field, JSON.stringify(currentValue))

    return currentValue
  }

  get(key: string): Promise<string> {
    return promisify(this.client.get).bind(this.client)(key)
  }

  set(key: string, value: string): Promise<{}> {
    return promisify(this.client.set).bind(this.client)(key, value)
  }

  del(key: string): Promise<{}> {
    return promisify(this.client.del).bind(this.client)(key)
  }

  hget(key: string, field: string): Promise<string> {
    return promisify(this.client.hget).bind(this.client)(key, field)
  }
  hset(key: string, field: string, value: any): Promise<string> {
    return promisify(this.client.hset).bind(this.client)(key, field, value)
  }

  setWithTtl(key: string, value: string, ttl: number): Promise<void> {
    return promisify(this.client.set).bind(this.client)(key, value, 'EX', ttl)
  }

  // TODO: analizar si tiene sentido separar el _client_ (arriba) del _service_ (abajo)

  async getSession(sessionId) {
    const sessionJson = await this.get(getSessionKey(sessionId))
    return sessionJson ? JSON.parse(sessionJson) : null
  }

  async getCoreOAuthData(sessionId) {
    const tokensJson = await this.get(getCoreOAuthDataKey(sessionId))
    return tokensJson ? JSON.parse(tokensJson) : null
  }

  async setCoreOAuthData(sessionId, oauth: { expires_in: number }) {
    const key = getCoreOAuthDataKey(sessionId)
    const value = JSON.stringify(oauth)
    return this.setWithTtl(key, value, oauth.expires_in)
  }
}
